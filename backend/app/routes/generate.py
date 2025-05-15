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
You are an expert Manim animator.
Break the following text into 3 scenes.
For each scene provide:
Scene N Title: <title>
Narration: <text narration>
Manim Code:
<class definition of Manim Scene, Python code>
Text to explain: {request.prompt}

Output format:

Scene 1 Title: ...
Narration: ...
Manim Code:
<class ...>

Scene 2 Title: ...
Narration: ...
Manim Code:
<class ...>

Scene 3 Title: ...
Narration: ...
Manim Code:
<class ...>
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
