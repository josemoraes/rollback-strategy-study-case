import { UsersRepository } from "../../repositories/UsersRepository";
import { User } from "../../entities/User";
import { UsersRepositoryInMemory } from "../../repositories/UsersRepositoryInMemory";

class UsersUseCases {
  constructor(private readonly usersRepository: UsersRepository) {}

  createUser(user: User) {
    this.usersRepository.store(user);
  }

  updateUser(user: User) {
    this.usersRepository.update(user);
  }

  listUsers() {
    return this.usersRepository.list();
  }

  rollbackUser(email: string) {
    this.usersRepository.rollback(email);
  }
}

export default new UsersUseCases(new UsersRepositoryInMemory());