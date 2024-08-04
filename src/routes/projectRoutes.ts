/**
 * Project Routes:
 *   - GET /projects: Get a list of all projects.
 *   - GET /projects/:id: Get a single project by ID.
 *   - POST /projects: Create a new project (requires admin permissions).
 *   - PUT /projects/:id: Update an existing project by ID (requires admin permissions).
 *   - DELETE /projects/:id: Delete a project by ID (requires admin permissions).
 */

import { Router } from 'express';
import {createProject, getProjects, getProjectById, updateProject, deleteProject} from '../controllers/projectController';
import { isAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', isAdmin, createProject);
router.put('/:id', isAdmin, updateProject);
router.delete('/:id', isAdmin, deleteProject);

export default router;
