import express from 'express';
import { config } from './config/config';
import { connectToDatabase } from './config/database';

import userRoutes from './infrastructure/http/routes/userRouter';
import containerRoutes from './infrastructure/http/routes/containerRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/containers', containerRoutes);

connectToDatabase(config.mongodb_uri);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
