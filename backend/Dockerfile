FROM python:3.10-slim

# Install ffmpeg and other required system packages
RUN apt-get update && apt-get install -y \
    ffmpeg \
    git \
    build-essential \
    pkg-config \
    python3-dev \
    libcairo2-dev \
    libpango1.0-dev \
    libpangocairo-1.0-0 \
    fonts-dejavu-core \
    && rm -rf /var/lib/apt/lists/*

# Create working directory
WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the workers directory
COPY workers/ /app/workers/

# Set the working directory to workers
WORKDIR /app/workers

# Set Python to run in unbuffered mode to ensure logs are displayed immediately
ENV PYTHONUNBUFFERED=1

ENV $(cat .env)
# Run the worker
CMD ["python", "worker.py"]
