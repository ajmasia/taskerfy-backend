import { Document, model, Schema, Types } from 'mongoose';

export interface Container extends Document {
  title: string;
  description: string;
  type: 'project' | 'actions' | 'note' | 'frozen' | 'cooled' | 'open';
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ContainerSchema = new Schema<Container>(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    type: {
      type: String,
      enum: ['project', 'action', 'note', 'frozen', 'cooled', 'open'],
      required: true
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const ContainerModel = model<Container>('Container', ContainerSchema);
