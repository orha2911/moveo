import express from 'express';
import bodyParser from 'body-parser';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';
import connectDB from './config/database';
import { isAuthenticated } from './middleware/authMiddleware';

// Create an Express application
const app = express();
app.use(bodyParser.json());

// Authentication routes
app.use('/auth', authRoutes);

// Protected routes
app.use('/projects', isAuthenticated, projectRoutes);
app.use('/projects', isAuthenticated, taskRoutes);

// Establish database connection
connectDB();

export default app;
