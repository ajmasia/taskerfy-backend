import { User, UserModel } from '../../domain/models/user';
import { UserRepository } from '../../domain/repositories/userRepository';

export class MongoUserRepository implements UserRepository {
  async create(user: Partial<User>): Promise<User> {
    const newUser = new UserModel(user);

    await newUser.save();

    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email });
  }
}
