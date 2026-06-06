FROM python:3.12-slim

WORKDIR /app

# Prevents Python from writing .pyc cache files
ENV PYTHONDONTWRITEBYTECODE=1
# Ensures logs appear immediately without buffering
ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip

# Copy dependencies first to leverage Docker layer caching
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
