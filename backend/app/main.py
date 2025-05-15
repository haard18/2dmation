# app/main.py
from fastapi import FastAPI
from app.routes import generate, render, status

app = FastAPI()

app.include_router(generate.router)
app.include_router(render.router)
app.include_router(status.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
