from fastapi import APIRouter
from fastapi.responses import FileResponse
import os

router = APIRouter(prefix="/status", tags=["status"])

RENDER_DIR = "renders"

@router.get("/{scene_id}")
async def get_scene_status(scene_id: str):
    video_path = os.path.join(RENDER_DIR, f"{scene_id}.mp4")
    if os.path.exists(video_path):
        return {
            "status": "done",
            "video_url": f"/renders/{scene_id}.mp4"
        }
    return { "status": "pending" }

@router.get("/video/{scene_id}")
async def get_video(scene_id: str):
    video_path = os.path.join(RENDER_DIR, f"{scene_id}.mp4")
    if os.path.exists(video_path):
        return FileResponse(video_path, media_type="video/mp4")
    return { "error": "Not found" }
