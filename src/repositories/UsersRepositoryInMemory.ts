import { User } from '../entities/User';
import { UsersRepository } from './UsersRepository';
import pino from 'pino';
const logger = pino();

class UsersRepositoryInMemory implements UsersRepository {
  private users: Map<string, User> = new Map();

  list(): User[] {
    logger.info({users:Array.from(this.users.values())},`Listing users`);
    return Array.from(this.users.values());
  }

  findByEmail(email: string): User | null {
    return this.users.get(email) || null;
  }

  update(user: User): void {
    logger.info({user},`Updating user`);
    this.users.set(user.email, user);
  }

  store(user: User): void {
    if (!this.users.get(user.email)) {
      logger.info({user},`Storing user`);
      this.users.set(user.email, user);
    }
  }
}

export {
  UsersRepositoryInMemory
};