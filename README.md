# Express TypeScript Redis Cache Project

A Node.js application built with Express.js, TypeScript, and Redis for caching.

## Prerequisites

- Docker and Docker Compose installed on your machine
- Node.js (if you want to run locally without Docker)

## Project Setup

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/MinPyaeKyaw/code-test-redis-cache.git
cd code-test-redis-cache
```

2. Build and run the application using Docker Compose:
```bash
docker compose up --build
```

This will:
- Build the Node.js application container
- Start a Redis container
- Set up the network between the services
- Create a persistent volume for Redis data

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start the application in development mode with hot-reload
- `npm run start` - Start the application in production mode
- `npm run build` - Build the TypeScript code
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code using Prettier