import express from 'express';
import { containerController as controller } from '../../controllers/container';

const router = express.Router();

router
  .get('/', controller.getAllContainers)
  .get('/:id', controller.getContainer)
  .post('/', controller.addContainer)
  .put('/:id', controller.updateContainer)
  .delete('/:id', controller.deleteContainer);

export { router as containerRoutes };
