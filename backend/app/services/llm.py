# app/services/llm.py

import os
import aiohttp
import asyncio
from dotenv import load_dotenv
from google import genai
import together;
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

# --- Gemini ---
def call_gemini_sync(prompt: str) -> str:
    client = genai.Client(api_key=GOOGLE_API_KEY)
    try:
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=prompt
        )
        return response.text
    except Exception as e:
        print(f"Claude API error: {e}")
        return ""

async def call_gemini(prompt: str) -> str:
    return await asyncio.to_thread(call_gemini_sync, prompt)

def call_together_sync(prompt: str) -> str:
    client = together.Client(api_key=TOGETHER_API_KEY)
    try:
        response = client.chat.completions.create(
            model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
            messages=[
                {
                    "role": "system",
                    "content": """You are a professional Manim animation expert and Python code generator.

Your task is to break down the following topic into 3 short, educational animated scenes using valid ManimCE code.

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
You MUST follow this exact format for each scene:

Scene 1 Title: <title>
Narration: <narration>
Manim Code:
```python
from manim import *

class Scene1(Scene):
    def construct(self):
        # Your code here
```

Scene 2 Title: <title>
Narration: <narration>
Manim Code:
```python
from manim import *

class Scene2(Scene):
    def construct(self):
        # Your code here
```

Scene 3 Title: <title>
Narration: <narration>
Manim Code:
```python
from manim import *

class Scene3(Scene):
    def construct(self):
        # Your code here
```

IMPORTANT: Each scene MUST be separated by a blank line, and the Manim code MUST be wrapped in ```python code blocks."""
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Together API error: {e}")
        return ""

async def call_together(prompt: str) -> str:
    return await asyncio.to_thread(call_together_sync, prompt)

# --- Router ---
async def call_llm(prompt: str, model: str = "gemini") -> str:
    if model == "gemini":
        return await call_gemini(prompt)
    elif model == "together":
        return await call_together(prompt)
    else:
        raise ValueError(f"Unsupported model: {model}")
