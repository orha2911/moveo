# Task Management API

## Overview

This project provides a RESTful API for managing projects and tasks, including user authentication. It uses Node.js with Express for the server, MongoDB for the database, and AWS Cognito for user authentication.

## Features

- **Project Management**: Create, read, update, and delete projects.
- **Task Management**: Create, read, update, and delete tasks within projects.
- **User Authentication**: Sign up, sign in, and sign out users with AWS Cognito.
- **Role-based Access Control**: Restrict access to certain routes based on user roles.

## Installation
1. Clone this repository to your local machine.
    ```
    git clone https://github.com/orha2911/task-management.git
    ```
2. Navigate to the project directory.
    ```
    cd signature-generator
    ```
3. Running the Application
    ```
     npm start
    ```


## API Endpoints

### Projects
- Create: POST /projects
- Get All: GET /projects
- Get By ID: GET /projects/:id
- Update: PUT /projects/:id
- Delete: DELETE /projects/:id

### Tasks
- Create: POST /projects/:projectId/tasks
- Get By Project: GET /projects/:projectId/tasks
- Get By ID: GET /projects/:projectId/tasks/:taskId
- Update: PUT /projects/:projectId/tasks/:taskId
- Delete: DELETE /projects/:projectId/tasks/:taskId
- Delete All Tasks in Project: DELETE /projects/:projectId/tasks

### Authentication
- Sign Up: POST /auth/signup
- Sign In: POST /auth/signin
- Sign Out: POST /auth/signout

## Testing

To run the tests, use the following command:
    ```
    npm test
    ```
## Sample User Credentials

- **Admin User**
  - Username: `admin@example.com`
  - Password: `'P@ssw0rd!'`

- **Non-Admin User**
  - Username: `non_admin@example.com`
  - Password: `'P@ssw0rd!'`