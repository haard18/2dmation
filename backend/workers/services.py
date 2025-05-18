import redis
import json
import os
from dotenv import load_dotenv
import time
load_dotenv()
while True:
    try:
        r = redis.from_url(os.getenv("REDIS_URL"), decode_responses=True)
        break
    except redis.exceptions.ConnectionError as ce:
        print(f"[Redis] Connection dropped: {ce}. Reconnecting in 5s...")
        time.sleep(5)
        # Re-initialize Redis connection
        r = redis.from_url(os.getenv("REDIS_URL"), decode_responses=True)
        continue  # Continue the loop instead of breaking
    

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

result = r.blpop("render_queue", timeout=60)  # 60 second timeout

