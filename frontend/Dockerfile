# Use Node LTS (20+)
FROM node:20-alpine

WORKDIR /app

# Install dependencies separately for caching
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY frontend/ .

# Expose Next.js port
EXPOSE 3000

# Start Next.js development server
CMD ["npm", "run", "dev"]