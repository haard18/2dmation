from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import os
import json
from app.services.redis import r
from pathlib import Path
import redis

router = APIRouter(prefix="/status", tags=["status"])

# Use absolute path for renders directory
RENDER_DIR = Path(__file__).parent.parent.parent / "renders"

@router.get("/job/{job_id}")
async def get_job_details(job_id: str):
    print(f"Getting job details for {job_id}")
    try:
        job_key = f"render_job:{job_id}"
        job_data = r.hgetall(job_key)
        print(f"Redis data for {job_key}: {job_data}")
        
        if not job_data:
            print(f"No data found for job {job_id}")
            return {
                "status": "not_found",
                "video_url": None,
                "rendered_scenes": [],
                "failed_scenes": []
            }
            
        response = {
            "status": job_data.get("status", "pending"),
            "video_url": job_data.get("public_url", ""),
            "rendered_scenes": json.loads(job_data.get("rendered_scenes", "[]")),
            "failed_scenes": json.loads(job_data.get("failed_scenes", "[]"))
        }
        print(f"Returning response: {response}")
        return response
    except Exception as e:
        print(f"Error processing job {job_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{scene_id}")
async def get_scene_status(scene_id: str):
    try:
        video_path = RENDER_DIR / f"{scene_id}.mp4"
        if video_path.exists():
            return {
                "status": "done",
                "video_url": f"/renders/{scene_id}.mp4",
                "error": None
            }
        return {
            "status": "pending",
            "video_url": None,
            "error": None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))