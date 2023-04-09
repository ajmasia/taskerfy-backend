import { NextFunction, Request, Response } from 'express';

import { containerService as service } from '../services/container';
import { ErrorResponse } from '../utils/errorResponse';

const getAllContainers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const containers = await service.getAllContainers();

    if (containers.length === 0)
      return res.status(404).json({ success: false, message: 'No resources found' });

    res.status(200).json(containers);
  } catch (error) {
    next(error);
  }
};

const getContainer = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const container = await service.getContainer(id);

    if (!container)
      return next(new ErrorResponse(`Resource not found with id of ${id}`, 404));

    res.status(200).json({ success: true, data: container });
  } catch (error) {
    next(error);
  }
};

const addContainer = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const { name } = body;

  try {
    const findContainer = await service.getContainerByName(name);

    if (findContainer)
      return next(new ErrorResponse(`Resource with name ${name} already exists`, 400));

    const container = await service.addContainer(body);

    res.status(201).json({ success: true, data: container });
  } catch (error) {
    next(error);
  }
};

const updateContainer = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const container = await service.updateContainer(id, body);

    if (container) {
      res.status(200).json({ success: true, data: container });
    } else {
      next(new ErrorResponse(`Resource not found with id of ${id}`, 404));
    }
  } catch (error) {
    next(error);
  }
};

const deleteContainer = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const container = await service.deleteContainer(id);

    if (container) {
      res.status(200).json({ success: true, message: 'Container deleted successfully' });
    } else {
      next(new ErrorResponse(`Resource not found with id of ${id}`, 404));
    }
  } catch (error) {
    next(error);
  }
};

export const containerController = {
  getAllContainers,
  getContainer,
  addContainer,
  updateContainer,
  deleteContainer
};
