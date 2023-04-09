import { Container, ContainerModel } from '../../domain/models/container';
import { ContainerRepository } from '../../domain/repositories/containerRespository';

export class MongooseContainerRepository implements ContainerRepository {
  async create(
    containerData: Pick<Container, 'title' | 'description' | 'type' | 'userId'>
  ): Promise<Container> {
    const container = new ContainerModel(containerData);

    await container.save();

    return container.toObject();
  }

  async getById(id: string): Promise<Container | null> {
    const container = await ContainerModel.findById(id).exec();

    return container?.toObject() ?? null;
  }

  async getAllByUserId(userId: string): Promise<Container[]> {
    const containers = await ContainerModel.find({ userId }).exec();

    return containers.map(container => container.toObject());
  }

  async update(id: string, containerData: Partial<Container>): Promise<boolean> {
    const result = await ContainerModel.findByIdAndUpdate(id, containerData).exec();

    return !!result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ContainerModel.findByIdAndDelete(id).exec();

    return !!result;
  }
}
