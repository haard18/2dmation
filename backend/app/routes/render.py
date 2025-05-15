import uuid
import redis
from fastapi import APIRouter, HTTPException
from app.services.redis import get_video_scene_ids, get_scene

r = redis.Redis(host="localhost", port=6379, decode_responses=True)

router = APIRouter(prefix="/render", tags=["render"])

@router.post("/{video_id}")
async def render_video(video_id: str):
    try:
        scene_ids = get_video_scene_ids(video_id)
        if not scene_ids:
            raise HTTPException(status_code=404, detail="Video ID not found")

        for scene_id in scene_ids:
            if not get_scene(scene_id):
                raise HTTPException(status_code=404, detail=f"Scene {scene_id} not found")

        # Create unique job id
        job_id = str(uuid.uuid4())

        # Store job metadata
        r.hset(f"render_job:{job_id}", mapping={
            "video_id": video_id,
            "status": "queued"
        })

        # Push job id to the render queue
        r.rpush("render_queue", job_id)

        return {"message": "Render job queued", "render_job_id": job_id}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
