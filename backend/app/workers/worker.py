import os
import json
import subprocess
from pathlib import Path
from app.services.redis import get_video_scene_ids, get_scene
import redis
from supabase import create_client, Client

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SERVICE_ROLE")
SUPABASE_BUCKET = "videos"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
REDIS_HOST = "localhost"
REDIS_PORT = 6379
WORK_DIR = "./renders"  # Make sure this is volume-mounted in Docker

r = redis.from_url(os.getenv("REDIS_URL"), decode_responses=True)
def write_scene_files(video_id, scenes):
    video_dir = Path(WORK_DIR) / video_id
    video_dir.mkdir(parents=True, exist_ok=True)
    
    for idx, scene in enumerate(scenes, start=1):
        file_path = video_dir / f"scene{idx}.py"
        with open(file_path, "w") as f:
            f.write(scene["manim_code"])

    return video_dir

def render_scene(video_dir, scene_file):
    cmd = [
        "manim",
        "-pql",
        scene_file
    ]
    result = subprocess.run(cmd, cwd=video_dir, capture_output=True, text=True)
    if result.returncode != 0:
        raise Exception(f"Failed to render {scene_file}: {result.stderr}")

def find_rendered_video(video_dir, scene_name):
    """
    Find the rendered video file inside:
    renders/videoid/media/videos/scene_name/{resolution_folder}/
    Pick the first mp4 found in the resolution folder.
    """
    base_path = video_dir / "media" / "videos" / scene_name
    if not base_path.exists():
        raise FileNotFoundError(f"Video folder missing: {base_path}")

    # Scan subfolders (resolution folders like '480p15')
    for res_folder in base_path.iterdir():
        if res_folder.is_dir():
            mp4_files = list(res_folder.glob("*.mp4"))
            if mp4_files:
                # Just pick the first .mp4 file found
                return mp4_files[0]

    # Fallback: maybe mp4 directly under base_path (unlikely but just in case)
    mp4_files = list(base_path.glob("*.mp4"))
    if mp4_files:
        return mp4_files[0]

    raise FileNotFoundError(f"No mp4 file found for scene {scene_name} in {base_path}")

def merge_videos(video_dir, scene_count, output_name="final_video.mp4"):
    input_files = []
    for idx in range(1, scene_count + 1):
        scene_name = f"scene{idx}"
        video_path = find_rendered_video(video_dir, scene_name)
        input_files.append(video_path)

    list_file = video_dir / "videos.txt"
    with open(list_file, "w") as f:
        for file_path in input_files:
            f.write(f"file '{file_path.resolve()}'\n")

    output_path = video_dir / output_name

    cmd = [
        "ffmpeg",
        "-f", "concat",
        "-safe", "0",
        "-i", str(list_file),
        "-c", "copy",
        str(output_path)
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise Exception(f"Failed to merge videos: {result.stderr}")
    
    return output_path

def worker_loop():
    print("Worker started, waiting for jobs...")
    while True:
        _, job_id = r.blpop("render_queue")
        print(f"Picked job: {job_id}")

        job_key = f"render_job:{job_id}"
        job_data = r.hgetall(job_key)
        video_id = job_data.get("video_id")

        try:
            r.hset(job_key, "status", "in_progress")

            scene_ids = get_video_scene_ids(video_id)
            if not scene_ids:
                raise Exception(f"No scenes found for video {video_id}")

            scenes = []
            for scene_id in scene_ids:
                scene = get_scene(scene_id)
                if not scene:
                    raise Exception(f"Scene {scene_id} missing")
                scenes.append(scene)

            video_dir = write_scene_files(video_id, scenes)

            for idx in range(len(scenes)):
                scene_file = f"scene{idx+1}.py"
                print(f"Rendering {scene_file} ...")
                render_scene(video_dir, scene_file)

            print("Merging videos...")
            final_video = merge_videos(video_dir, len(scenes))

            with open(final_video, "rb") as f:
                file_data = f.read()
                
            file_name = f"{video_id}.mp4"

            try:
                upload_response = supabase.storage.from_(SUPABASE_BUCKET).upload(file_name, file_data, {
                    "content-type": "video/mp4",
                    "cache-control": "3600"
                })
                
                # Get public URL
                public_url = supabase.storage.from_(SUPABASE_BUCKET).get_public_url(file_name)
                r.hset(job_key, mapping={
                    "status": "completed",
                    "public_url": public_url
                })
                print(f"Job {job_id} completed, video URL: {public_url}")
            except Exception as upload_error:
                raise Exception(f"Supabase upload failed: {str(upload_error)}")

        except Exception as e:
            r.hset(job_key, "status", "failed")
            r.hset(job_key, "error", str(e))
            print(f"Job {job_id} failed: {e}")

if __name__ == "__main__":
    worker_loop()
