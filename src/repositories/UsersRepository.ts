import { User } from '../entities/User';

interface UsersRepository {
  list(): User[];
  findByEmail(email: string): User | null;
  store(user: User): void;
  update(user: User): void;
}

export { UsersRepository };