import app from './app';
import dotenv from 'dotenv';
import { redisService } from './services/redis.service';

// Load environment variables from the .env file
dotenv.config();

// Define the server port: use the PORT from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Initialize Redis connection
async function startServer() {
  try {
    await redisService.connect();

    // Start the Express server and listen on the specified port
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  await redisService.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Shutting down gracefully...');
  await redisService.disconnect();
  process.exit(0);
});

startServer();
