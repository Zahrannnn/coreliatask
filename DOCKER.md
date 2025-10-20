# Docker Deployment Guide

## Quick Start

### Build the Docker image
```bash
docker build -t contacts-app .
```

### Run the container
```bash
docker run -d -p 8080:80 --name contacts-app contacts-app
```

Access the app at: `http://localhost:8080`

## Docker Commands

### Stop the container
```bash
docker stop contacts-app
```

### Start the container
```bash
docker start contacts-app
```

### Remove the container
```bash
docker rm contacts-app
```

### View logs
```bash
docker logs contacts-app
```

### View running containers
```bash
docker ps
```

## Docker Compose (Optional)

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

Then run:
```bash
docker-compose up -d
```

## Production Deployment

### Build for production
```bash
docker build -t your-registry/contacts-app:latest .
```

### Push to registry
```bash
docker push your-registry/contacts-app:latest
```

### Pull and run on server
```bash
docker pull your-registry/contacts-app:latest
docker run -d -p 80:80 --name contacts-app --restart always your-registry/contacts-app:latest
```

## Notes

- The Dockerfile uses a multi-stage build to keep the final image small (~25MB)
- Nginx serves the static files with proper SPA routing support
- All routes fall back to `index.html` for React Router to handle
- Static assets are cached for 1 year for better performance
- Security headers are included in the nginx configuration

