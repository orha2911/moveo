import { Request, Response } from 'express';
import Project from '../models/project';
import Task from '../models/task';
import { handleError } from '../utils/errorHandler';


// Create a new project
export const createProject = async (req: Request, res: Response) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    handleError(error, res);
  }
};

// Get all projects with optional pagination
export const getProjects = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const projects = await Project.find().limit(Number(limit)).skip((Number(page) - 1) * Number(limit)); // Limit the number of results and skip results based on the current page
    res.status(200).json(projects);
  } catch (error) {
    handleError(error, res);
  }
};

// Get a single project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    handleError(error, res);
  }
};

// Update a project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    handleError(error, res);
  }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id;
    await Task.deleteMany({ projectId });
    const project = await Project.findByIdAndDelete(projectId);
    if (project) {
      res.status(200).json({ message: 'project deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    handleError(error, res);
  }
};
