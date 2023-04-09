import { Container, ContainerModel } from '../database/models/container';

const getAllContainers = async (): Promise<Container[]> => {
  return await ContainerModel.find();
};

export const getContainer = async (id: string): Promise<Container | null> => {
  return await ContainerModel.findById(id);
};

export const getContainerByName = async (name: string): Promise<Container | null> => {
  return await ContainerModel.findOne({ name });
};

const addContainer = async (containerData: Partial<Container>): Promise<Container> => {
  const container = new ContainerModel(containerData);
  return await container.save();
};

export const updateContainer = async (
  id: string,
  updateData: Partial<Container>
): Promise<Container | null> => {
  return await ContainerModel.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteContainer = async (id: string): Promise<Container | null> => {
  return await ContainerModel.findByIdAndDelete(id);
};

export const containerService = {
  getAllContainers,
  getContainer,
  getContainerByName,
  addContainer,
  updateContainer,
  deleteContainer
};
