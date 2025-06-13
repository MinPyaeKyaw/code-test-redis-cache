import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/error-handler';
import helmet from 'helmet';
import productRoutes from './features/product/product.route';

// Initialize the Express application
const app = express();

// Middleware to set security-related HTTP headers
app.use(helmet());

// Enable CORS for all routes and origins
app.use(cors());

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Middleware to parse URL-encoded payloads (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies attached to the client request
app.use(cookieParser());

// Register all application routes
app.use('/api', productRoutes);

// Register custom error handling middleware at the end
// This ensures it catches errors from previous middlewares or routes
app.use(errorHandler);

// Export the configured Express app for use (e.g., in server.ts)
export default app;
