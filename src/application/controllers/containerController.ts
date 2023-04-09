import { Request, Response } from 'express';
import { MongooseContainerRepository } from '../../infrastructure/repositories/containerRepositoryImplementation';
import { createContainer } from '../use-cases/containerUseCase';
import { AppError } from '../../domain/errors/AppError';

const containerRepository = new MongooseContainerRepository();

export async function addContainer(req: Request, res: Response): Promise<Response> {
  try {
    const container = await createContainer(containerRepository, req.body);

    return res.status(201).json(container);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ error: 'Error desconocido' });
  }
}
