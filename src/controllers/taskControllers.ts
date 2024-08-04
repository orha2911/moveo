import { Request, Response } from 'express';
import Task from '../models/task';
import { handleError } from '../utils/errorHandler';

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    handleError(error, res);
  }
};

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    handleError(error, res);
  }
};

// Get tasks by project ID
export const getTasksByProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ projectId });
    res.status(200).json(tasks);
  } catch (error) {
    handleError(error, res);
  }
};

// Get a single task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    handleError(error, res);
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    handleError(error, res);
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (task) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    handleError(error, res);
  }
};

// Delete all tasks for a project
export const deleteAllTasks = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const result = await Task.deleteMany({ projectId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No tasks found for this project.' });
    }
    res.status(200).json({ message: 'All tasks deleted successfully.' });

  } catch (error) {
    handleError(error, res);
  }
};

