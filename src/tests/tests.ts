import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import ProjectModel from '../models/project';
import TaskModel from '../models/task';
import {signIn, signOut} from "aws-amplify/auth"
import { MONGO_URI, USERNAMR_TEST, PASSWORD_TEST,NON_ADMIN_USERNAMR_TEST, NON_ADMIN_PASSWORD_TEST } from '../utils/constants'
import { Amplify } from 'aws-amplify';
import awsconfig from '../config/aws-exports';

Amplify.configure(awsconfig);

describe('Project API', () => {
  let projectId: string;

  beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
    await signIn({username: USERNAMR_TEST, password: PASSWORD_TEST});

    // Create a project that will be used in tests
    await ProjectModel.deleteMany({});    
    const projects = await ProjectModel.insertMany([
      { name: 'Project 1', description: 'Description 1' },
      { name: 'Project 2', description: 'Description 2' },
      { name: 'Project 3', description: 'Description 3' },
      { name: 'Project 4', description: 'Description 4' },
      { name: 'Project 5', description: 'Description 5' }
    ]);

    projectId = projects[0]._id.toString();

   // Create tasks that will be used in tests
    await TaskModel.create([
      { title: 'Task 1', description: 'Task 1 Description', status: 'todo', projectId },
      { title: 'Task 2', description: 'Task 2 Description', status: 'in-progress', projectId }
    ]);
  });

  afterAll(async () => {
    await signOut();
    await mongoose.connection.close();
  });

  it('should create a new project', async () => {
    const res = await request(app)
      .post('/projects')
      .send({
        name: 'Test Create New Project',
        description: 'Test Create New Project',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Test Create New Project');
  });

  it('should fetch all projects', async () => {
    const res = await request(app).get('/projects');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(6);
  });

  it('should fetch a single project by ID', async () => {
    const res = await request(app).get(`/projects/${projectId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Project 1');
    expect(res.body.description).toBe('Description 1');
  });

  it('should fetch the first page of projects', async () => {
    const res = await request(app).get('/projects?page=1&limit=5');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(5);
  });

  it('should fetch the second page of projects', async () => {
    const res = await request(app).get('/projects?page=2&limit=5');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
  });

  it('should update a project', async () => {
    const res = await request(app)
      .put(`/projects/${projectId}`)
      .send({
        name: 'Updated Project Name',
        description: 'Updated Description',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Updated Project Name');
    expect(res.body.description).toBe('Updated Description');
  });

  it('should delete a project', async () => {
    const res = await request(app)
      .delete(`/projects/${projectId}`);
    expect(res.statusCode).toEqual(200);
    // Verify that the project was deleted
    const deletedProject = await ProjectModel.findById(projectId);
    expect(deletedProject).toBeNull();
    // Verify that the assosiated tasks were deleted
    const tasks = await TaskModel.find({ projectId });
    expect(tasks.length).toBe(0);
  });

});

describe('Task API', () => {
  let projectId: string;
  let taskId: string;
  beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
    await signIn({username: USERNAMR_TEST, password: PASSWORD_TEST});

    // Create a project that will be used in tests
    await ProjectModel.deleteMany({});
    const project = await ProjectModel.create({ name: 'Test Project', description: 'Test Description' });
    projectId = project._id.toString();

    // Create tasks that will be used in tests
    const tasks = await TaskModel.create([
      { title: 'Task 1', description: 'Task 1 Description', status: 'todo', projectId },
      { title: 'Task 2', description: 'Task 2 Description', status: 'in-progress', projectId }
    ]);
    taskId = tasks[0]._id.toString();
  });

  afterAll(async () => {
    await signOut();
    await mongoose.connection.close();
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post(`/projects/${projectId}/tasks`)
      .send({
        title: 'Test Task',
        description: 'Test Task Description',
        status: 'todo',
        projectId: projectId
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Test Task');
  });

  it('should fetch all tasks for a project', async () => {
    const res = await request(app).get(`/projects/${projectId}/tasks`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(3);
  });

  it('should fetch a single task by ID', async () => {
    const res = await request(app).get(`/projects/${projectId}/tasks/${taskId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Task 1');
    expect(res.body.description).toBe('Task 1 Description');
  });

  it('should update a task', async () => {
    const res = await request(app)
      .put(`/projects/${projectId}/tasks/${taskId}`)
      .send({
        title: 'Updated Task Title',
        description: 'Updated Task Description',
        status: 'in-progress'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Updated Task Title');
    expect(res.body.description).toBe('Updated Task Description');
  });

  it('should delete a task', async () => {
    const res = await request(app)
      .delete(`/projects/${projectId}/tasks/${taskId}`);

    expect(res.statusCode).toEqual(204);

    // Verify that the task was deleted
    const deletedTask = await TaskModel.findById(taskId);
    expect(deletedTask).toBeNull();
  });

  it('should delete all tasks from a project', async () => {
    const res = await request(app)
      .delete(`/projects/${projectId}/tasks`);

    expect(res.statusCode).toEqual(200);

    // Verify that all tasks were deleted
    const remainingTasks = await TaskModel.find({ projectId });
    expect(remainingTasks.length).toBe(0);
  });


});

describe('Non-admin user tests', () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
    await signIn({username: NON_ADMIN_USERNAMR_TEST, password: NON_ADMIN_PASSWORD_TEST});
  });

  afterAll(async () => {
    await signOut();
    await mongoose.connection.close();
  });

  it('should be able to fetch projects', async () => {
    const res = await request(app)
      .get('/projects');

    expect(res.statusCode).toEqual(200);
  });

  it('should not be able to create a project', async () => {
    const res = await request(app)
      .post('/projects/')
      .send({
        name: 'Test non admin',
        description: 'Test non admin',
      });

    expect(res.statusCode).toEqual(403);
  });

  it('should not be able to delete a project', async () => {
    const res = await request(app)
      .delete('/projects/1');

    expect(res.statusCode).toEqual(403);
  });

  it('should not be able to update a project', async () => {
    const res = await request(app)
      .put('/projects/1')
      .send({
        name: 'Test non admin',
        description: 'Test non admin',
      });

    expect(res.statusCode).toEqual(403);
  });

});
