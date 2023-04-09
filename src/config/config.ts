import dotenv from 'dotenv';

dotenv.config();

export const config = {
  mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp',
  jwt_secret: process.env.JWT_SECRET || 'mysecret',
  port: process.env.PORT || 3000
};
