import redis
import json

r = redis.Redis(host="localhost", port=6379, decode_responses=True)

def save_scene(scene_id, data):
    r.set(f"scene:{scene_id}", json.dumps(data))

def save_video(video_id, scene_ids):
    r.set(f"video:{video_id}", json.dumps(scene_ids))

def get_scene(scene_id):
    return json.loads(r.get(f"scene:{scene_id}"))

def get_video_scene_ids(video_id):
    return json.loads(r.get(f"video:{video_id}"))
