# app/services/llm.py

import os
import aiohttp
import asyncio
from google import genai



def call_gemini_sync(prompt: str) -> str:
    client = genai.Client(api_key=GOOGLE_API_KEY)
    try:
        response = client.models.generate_content(model="gemini-1.5-flash", contents=prompt)
        return response.text
    except Exception as e:
        print(f"Gemini API error: {e}")
        return ""
async def call_gemini(prompt: str) -> str:
    return await asyncio.to_thread(call_gemini_sync, prompt)

async def call_llm(prompt: str, model: str = "gemini") -> str:
    if model == "gemini":
        return await call_gemini(prompt)
    else:
        raise ValueError(f"Unsupported model: {model}")
