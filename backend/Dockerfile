# Use an official Python image
FROM python:3.10-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    pkg-config \
    ffmpeg \
    libpango-1.0-0 \
    build-essential \
    texlive-latex-base \
    texlive-fonts-recommended \
    texlive-latex-extra \
    texlive-fonts-extra \
    texlive-xetex \
    libcairo2 \
    libcairo2-dev \
    libpango1.0-dev \    
    && rm -rf /var/lib/apt/lists/*


# Set working directory
WORKDIR /app

# Copy project files
COPY workers/ /app/

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variables
ENV REDIS_URL=rediss://red-d0j1b96uk2gs73arkc90:0ntpupxbrLO5C380MvfXrFICQag2WxVS@oregon-keyvalue.render.com:6379
ENV SUPABASE_URL=https://rufezaehgzjyvslcwojx.supabase.co
ENV SERVICE_ROLE=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1ZmV6YWVoZ3pqeXZzbGN3b2p4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzMzMjMyOCwiZXhwIjoyMDYyOTA4MzI4fQ.50PQkdSfZEysxf9SoaqD4hzz2rRML1g1t-U32mcSDOI

# Run the script
CMD ["python", "worker.py"]
