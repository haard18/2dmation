# Use official Python base image
FROM python:3.11-slim

# Install dependencies for manim and ffmpeg
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libcairo2-dev \
    pkg-config \
    python3-pil \
    libpango1.0-dev \
    libcairo2-dev \
    libgdk-pixbuf2.0-dev \
    libpangocairo-1.0-0 \
    build-essential \
    python3-dev \
    gcc \
    g++ \
    make

# Install manim and redis client
RUN pip install --no-cache-dir manim redis

# Set working directory
WORKDIR /app

# Set Python path
ENV PYTHONPATH=/app

# Copy your app code
COPY . /app

# Install the app package
RUN pip install -e .

# Set environment variable for renders folder
ENV WORK_DIR=/renders

# Make renders folder accessible and mountable
VOLUME ["/renders"]

# Default command to run your worker
CMD ["python", "-m", "app.workers.worker"]
