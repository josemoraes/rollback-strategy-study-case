import { User } from '../entities/User';
import { SnapshotRepository } from './SnapshotRepository';
import { SnapshotRepositoryInMemoryImpl } from './SnapshotRepositoryInMemory';
import { UsersRepository } from './UsersRepository';
import pino from 'pino';
const logger = pino();

class UsersRepositoryInMemory implements UsersRepository {
  private users: Map<string, User> = new Map();
  private snapshotRepository: SnapshotRepository = new SnapshotRepositoryInMemoryImpl();
  private _ENTITY = 'user';

  list(): User[] {
    logger.info({users:Array.from(this.users.values())},`Listing users`);
    return Array.from(this.users.values());
  }

  update(user: User): void {
    const previousState = this.users.get(user.email);

    logger.info({user},`Updating user`);

    this.snapshotRepository.store({
      entity_id: user.email,
      entity: this._ENTITY,
      data: JSON.stringify(previousState)
    });

    this.users.set(user.email, user);
  }

  store(user: User): void {
    if (!this.users.get(user.email)) {
      logger.info({user},`Storing user`);
      this.users.set(user.email, user);
    }
  }

  rollback(email: string): void {
    const previousState = this.snapshotRepository.findByEntity(this._ENTITY, email);
    if (previousState) {
      logger.info({previousState},`Rolling back user`);
      this.users.set(email, JSON.parse(previousState.data));
      this.snapshotRepository.delete(previousState.entity_id);
    }
  }

}

export {
  UsersRepositoryInMemory
};