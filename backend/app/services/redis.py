import redis
import json
import os
from dotenv import load_dotenv

load_dotenv()

r = redis.from_url(os.getenv("REDIS_URL"), decode_responses=True)

def save_scene(scene_id, data):
    r.set(f"scene:{scene_id}", json.dumps(data),ex=60*60*24*30  )

def save_video(video_id, scene_ids):
    r.set(f"video:{video_id}", json.dumps(scene_ids),ex=60*60*24*30)

def get_scene(scene_id):
    return json.loads(r.get(f"scene:{scene_id}"))

def get_video_scene_ids(video_id):
    return json.loads(r.get(f"video:{video_id}"))

def get_video_status(video_id):
    return r.get(f"video:{video_id}")

def get_video_url(video_id):
    return r.get(f"video:{video_id}")
