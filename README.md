# Express TypeScript Redis Cache Project

A Node.js application built with Express.js, TypeScript, and Redis for caching.

## Prerequisites

- Docker and Docker Compose installed on your machine

## Project Setup

### Using Docker

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

## API Documentation

The API documentation is available as a Postman collection. You can import the collection to test and explore the available endpoints.

### Postman Collection

1. Download the Postman collection file from the `root` directory: `./code-test.postman_collection`
2. Import the collection into Postman:
   - Open Postman
   - Click on "Import" button
   - Drag and drop the collection file or click "Upload Files" to select it
   - The collection will be imported with all available endpoints and example requests

### API Base URL

When running locally, the API base URL is: `http://localhost:3000`