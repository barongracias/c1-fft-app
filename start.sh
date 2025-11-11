#!/bin/bash
echo "🚀 Starting FFT App (development)..."
if [ "$(uname)" = "Darwin" ] && ! docker info >/dev/null 2>&1; then
  echo "🐳 Docker is not running — launching Docker Desktop..."
  open -a Docker
  echo "⏳ Waiting for Docker to start..."
  while ! docker info >/dev/null 2>&1; do sleep 1; done
fi
echo "🐳 Docker is running!"
docker compose up --build
