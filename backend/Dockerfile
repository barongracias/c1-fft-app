# Python base image
FROM python:3.13-slim

# Prevent Python from buffering stdout
ENV PYTHONUNBUFFERED=1

# Create /app directory
WORKDIR /app

# Install dependencies
COPY backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY backend/ /app

# Expose FastAPI port
EXPOSE 8000

# Start Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]