import { model, Schema, Types } from 'mongoose';
import { Task } from '../interfaces/Task';

// Define the Task schema
const TaskSchema: Schema<Task> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
});

// Create the Task model
const TaskModel = model<Task>('Task', TaskSchema);

export default TaskModel;
