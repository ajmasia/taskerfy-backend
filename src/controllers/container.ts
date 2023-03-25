import { Request, Response } from 'express';

import { containerService as service } from '../services/container';

const getAllContainers = async (req: Request, res: Response) => {
  try {
    const containers = await service.getAllContainers();

    if (containers.length === 0) {
      res.status(404).json({ message: 'No containers found' });
    }

    res.status(200).json(containers);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

const getContainerById = async (req: Request, res: Response) => {
  try {
    const container = await service.getContainer(req.params.id);

    if (container) {
      res.status(200).json(container);
    } else {
      res.status(404).json({ message: 'Container not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

const addContainer = async (req: Request, res: Response) => {
  try {
    const container = await service.addContainer(req.body);

    res.status(201).json(container);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

const updateContainerById = async (req: Request, res: Response) => {
  try {
    const container = await service.updateContainer(req.params.id, req.body);

    if (container) {
      res.status(200).json(container);
    } else {
      res.status(404).json({ message: 'Container not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

const deleteContainerById = async (req: Request, res: Response) => {
  try {
    const container = await service.deleteContainer(req.params.id);

    if (container) {
      res.status(200).json(container);
    } else {
      res.status(404).json({ message: 'Container not found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const containerController = {
  getAllContainers,
  getContainerById,
  addContainer,
  updateContainerById,
  deleteContainerById
};
