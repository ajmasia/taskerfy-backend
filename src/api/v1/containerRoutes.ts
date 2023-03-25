import express from 'express';
import { containerController as controller } from '../../controllers/container';

const router = express.Router();

router
  .get('/', controller.getAllContainers)
  .get('/:id', controller.getContainerById)
  .post('/', controller.addContainer)
  .put('/:id', controller.updateContainerById)
  .delete('/:id', controller.deleteContainerById);

export { router as containerRoutes };
