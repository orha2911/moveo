import { Schema, model } from 'mongoose';
import { Project } from '../interfaces/Project';

// Define the Project schema
const ProjectSchema: Schema<Project> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
  });

// Create the Project model
const ProjectModel  = model<Project>('Project', ProjectSchema);

export default ProjectModel ;
