import { User } from '../entities/User';

interface UsersRepository {
  list(): User[];
  store(user: User): void;
  update(user: User): void;
  rollback(email: string): void;
}

export { UsersRepository };