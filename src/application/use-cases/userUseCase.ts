import { UserRepository } from '../../domain/repositories/userRepository';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import { User } from '../../domain/models/user';
import { AppError } from '../../domain/errors/AppError';

const JWT_SECRET = config.jwt_secret;

export async function createUser(
  userRepo: UserRepository,
  userData: Partial<User>
): Promise<User> {
  if (!userData || !userData.email || !userData.password) {
    throw new AppError('No se proporcionaron datos de usuario', 400);
  }

  const existingUser = await userRepo.findByEmail(userData.email);

  if (existingUser) {
    throw new Error('El correo electrónico ya está registrado.');
  }

  const user = await userRepo.create({ ...userData });

  return user;
}

export async function loginUser(
  userRepo: UserRepository,
  userData: Pick<User, 'email' | 'password'>
): Promise<string> {
  if (!userData || !userData.email || !userData.password) {
    throw new AppError('No se proporcionaron datos de usuario', 400);
  }

  const user = await userRepo.findByEmail(userData.email);

  if (!user) {
    throw new Error('Credenciales incorrectas');
  }

  const isPasswordValid = await user.comparePasswords(userData.password);

  if (!isPasswordValid) {
    throw new Error('Credenciales incorrectas');
  }

  const token = jwt.sign({ userId: user._id.toString(), role: user.role }, JWT_SECRET, {
    expiresIn: '1h'
  });

  return token;
}
