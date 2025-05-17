from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Literal
from app.services.llm import call_llm
from app.services.redis import save_scene, save_video
import re
import uuid

router = APIRouter(prefix="/generate", tags=["generate"])

class GenerateRequest(BaseModel):
    prompt: str
    model: Literal["gemini"] = "gemini"

def parse_scenes_from_llm(text: str):
    scenes = []
    pattern = re.compile(
    r"Scene\s*\d+\s*Title:\s*(.*?)\nNarration:\s*(.*?)\n+Manim Code:\s*```(?:python)?\n(.*?)```",
    re.IGNORECASE | re.DOTALL
    )
    for match in pattern.finditer(text):
        title = match.group(1).strip()
        narration = match.group(2).strip()
        manim_code = match.group(3).strip()
        scene_id = f"scene_{uuid.uuid4().hex[:8]}"
        scenes.append({
            "id": scene_id,
            "title": title,
            "narration": narration,
            "manim_code": manim_code
        })
    if not scenes:
        scenes.append({
            "id": f"scene_{uuid.uuid4().hex[:6]}",
            "title": "Untitled Scene",
            "narration": text.strip(),
            "manim_code": "# Manim code not generated"
        })
    return scenes

@router.post("/")
async def generate_scenes(request: GenerateRequest):

    prompt = f"""
        You are a professional Manim animation expert and Python code generator.

        Your task is to break down the following topic into **3 short, educational animated scenes** using **valid ManimCE code**.

        ## Topic:
        {request.prompt}

        ## Rules:
        1. Each scene must have:
            - A short and clear title
            - A concise narration (for voiceover)
            - Valid Python ManimCE code in a single class (subclass of `Scene`)
        2. Only use the following Manim elements:
            - `Text`, `Circle`, `Dot`, `Arrow`
            - Colors: `RED`, `GREEN`, `BLUE`, `YELLOW`, `WHITE`, `BLACK`, `GRAY` (no light colors)
            - Transformations and animations like `.shift()`, `.scale()`, `.rotate()`, `.fade_out()`, `.fade_in()`, `Create()`, `Write()`, `MoveToTarget()`, `Transform()`, `Rotate()`, `FadeIn()`, `FadeOut()`
        3. Use only **positional arguments** unless you're absolutely certain the keyword is valid in Manim.
            - Example: ❌ `rotate_about_origin(about_point=...)` ← Invalid
            - ✅ `rotate(angle)` ← Valid
        4. Do **NOT**:
            - Use LaTeX or `Tex`
            - Import or use external assets
            - Use any unsupported or experimental APIs
            - Use any unverified keyword arguments
        5. Each scene class should be named `Scene1`, `Scene2`, `Scene3` respectively.

        ## Output Format:
        Scene 1 Title: <title>
        Narration: <narration>
        Manim Code:
        <class Scene1(Scene): ...>

        Scene 2 Title: <title>
        Narration: <narration>
        Manim Code:
        <class Scene2(Scene): ...>

        Scene 3 Title: <title>
        Narration: <narration>
        Manim Code:
        <class Scene3(Scene): ...>
        """

      
    try:
        llm_response = await call_llm(prompt, model=request.model)
        scenes = parse_scenes_from_llm(llm_response)

        video_id = f"video_{uuid.uuid4().hex[:8]}"
        scene_ids = []

        for scene in scenes:
            scene_ids.append(scene["id"])
            save_scene(scene["id"], {
                "title": scene["title"],
                "narration": scene["narration"],
                "manim_code": scene["manim_code"]
            })

        save_video(video_id, scene_ids)

        return {
            "message": "Scenes generated",
            "video_id": video_id,
            "scenes": [{"id": s["id"], "title": s["title"], "narration": s["narration"]} for s in scenes]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
