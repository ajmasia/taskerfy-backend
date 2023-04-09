import express from 'express';
import { connectToMongoDB } from './database/client';

import { containerRoutes } from './api/v1/containerRoutes';
import { errorHandler } from './middelwares/errorHandler';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/api/v1/containers', containerRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  try {
    await connectToMongoDB();
  } catch (error) {
    console.error('Error connecting to MongoDB', error);

    process.exit(1);
  }
  console.log(`Server listening on port ${PORT}`);
});
