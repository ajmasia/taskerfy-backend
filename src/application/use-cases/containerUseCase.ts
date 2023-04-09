import { Container } from '../../domain/models/container';
import { ContainerRepository } from '../../domain/repositories/containerRespository';

import { AppError } from '../../domain/errors/AppError';

export async function createContainer(
  containerRepo: ContainerRepository,
  containerData: Pick<Container, 'title' | 'description' | 'type' | 'userId'>
): Promise<Container> {
  if (
    !containerData ||
    !containerData.title ||
    !containerData.type ||
    !containerData.userId
  ) {
    throw new AppError('No se proporcionaron datos de usuario', 400);
  }

  const container = await containerRepo.create({ ...containerData });

  return container;
}
