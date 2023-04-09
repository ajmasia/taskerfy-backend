import { Container } from '../models/container';

export interface ContainerRepository {
  create(
    containerData: Pick<Container, 'title' | 'description' | 'type' | 'userId'>
  ): Promise<Container>;
  getById(id: string): Promise<Container | null>;
  getAllByUserId(userId: string): Promise<Container[]>;
  update(id: string, containerData: Partial<Container>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
