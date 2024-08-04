/**
 * Task Routes:
 *   - GET /:projectId/tasks: Get a list of all tasks for a specific project.
 *   - GET /:projectId/tasks/:taskId: Get a single task by ID for a specific project.
 *   - POST /:projectId/tasks: Create a new task within a specific project (requires admin permissions).
 *   - PUT /:projectId/tasks/:taskId: Update an existing task by ID within a specific project (requires admin permissions).
 *   - DELETE /:projectId/tasks/:taskId: Delete a task by ID within a specific project (requires admin permissions).
 *   - DELETE /:projectId/tasks: Delete all tasks within a specific project (requires admin permissions).
 */

import { Router } from 'express';
import {createTask, getTasksByProject, getTaskById, updateTask, deleteTask, deleteAllTasks} from '../controllers/taskControllers';
import { isAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/:projectId/tasks', getTasksByProject);
router.get('/:projectId/tasks/:taskId', getTaskById);
router.post('/:projectId/tasks', isAdmin, createTask);
router.put('/:projectId/tasks/:taskId', isAdmin, updateTask);
router.delete('/:projectId/tasks/:taskId', isAdmin, deleteTask);
router.delete('/:projectId/tasks', isAdmin, deleteAllTasks);

export default router;
