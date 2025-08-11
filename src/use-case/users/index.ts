import { UsersRepository } from "../../repositories/UsersRepository";
import { User } from "../../entities/User";
import { UsersRepositoryInMemory } from "../../repositories/UsersRepositoryInMemory";
import { SnapshotRepositoryInMemoryImpl } from "../../repositories/SnapshotRepositoryInMemory";
import SnapshotsUseCases from "../snapshots.ts";

class UsersUseCases {
  private snapshotsUseCases: SnapshotsUseCases;
  private _ENTITY = 'user';

  constructor(private readonly usersRepository: UsersRepository) {
    this.snapshotsUseCases = new SnapshotsUseCases(new SnapshotRepositoryInMemoryImpl());
  }

  createUser(user: User) {
    this.usersRepository.store(user);
  }

  updateUser(user: User) {
    const currentState = this.usersRepository.findByEmail(user.email);

    if (currentState) {
      this.snapshotsUseCases.createSnapshot({
        entity: this._ENTITY,
        entity_id: user.email,
        data: JSON.stringify(currentState)
      });
    }

    this.usersRepository.update(user);
  }

  listUsers() {
    return this.usersRepository.list();
  }

  rollbackUser(email: string) {
    const previousState = this.snapshotsUseCases.getSnapshot(this._ENTITY, email);
    if (previousState) {
      const user = JSON.parse(previousState.data) as User;
      this.updateUser(user);
    }
  }
}

export default new UsersUseCases(new UsersRepositoryInMemory());