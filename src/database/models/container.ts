import { Schema, model, Document } from 'mongoose';

export enum ContainerType {
  Projects = 'projects',
  Actions = 'actions',
  Notes = 'notes'
}

export interface Container extends Document {
  name: string;
  type: ContainerType;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContainerSchema = new Schema<Container>(
  {
    name: { type: String, required: true },
    type: { type: String, enum: Object.values(ContainerType), required: true },
    description: String
  },
  {
    timestamps: true
  }
);

export const ContainerModel = model<Container>('Container', ContainerSchema);
