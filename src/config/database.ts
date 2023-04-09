import mongoose from 'mongoose';

export async function connectToDatabase(mongodb_uri: string): Promise<void> {
  try {
    await mongoose.connect(mongodb_uri, {});
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}
