import { Request, Response } from 'express';
import { MongoUserRepository } from '../../infrastructure/repositories/userRepositoryImplementation';
import { createUser, loginUser } from '../use-cases/userUseCase';
import { AppError } from '../../domain/errors/AppError';

const userRepository = new MongoUserRepository();

export async function registerUser(req: Request, res: Response): Promise<Response> {
  try {
    const user = await createUser(userRepository, req.body);

    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Error desconocido' });
  }
}

export async function login(req: Request, res: Response): Promise<Response> {
  try {
    const token = await loginUser(userRepository, req.body);

    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Error desconocido' });
  }
}
