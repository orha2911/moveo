import { Types } from 'mongoose';

export interface Task {
  title: string;
  description: string;
  status: string;
  projectId: Types.ObjectId;
}