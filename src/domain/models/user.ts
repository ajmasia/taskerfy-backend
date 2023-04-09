import { Document, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User extends Document {
  username: string;
  email: string;
  role: 'admin' | 'owner';
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePasswords(password: string): Promise<boolean>;
}

const UserSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'owner'], default: 'owner' },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.methods.comparePasswords = function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const UserModel = model<User>('User', UserSchema);
