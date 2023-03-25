import { connect } from 'mongoose';

const DATABASE_NAME = process.env.DATABASE_NAME || 'taskerfy';
const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:${MONGODB_PORT}`;
const CONNECTION_STRING = `${MONGODB_URI}/${DATABASE_NAME}`;

export const connectToMongoDB = async (): Promise<void> => {
  await connect(CONNECTION_STRING, {});

  console.log(`Connected to MongoDB at ${CONNECTION_STRING}`);
};
