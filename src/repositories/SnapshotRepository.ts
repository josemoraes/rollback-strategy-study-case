import { Snapshot } from "../entities/Snapshot";

interface SnapshotRepository {
  list(): Snapshot[];
  store(state: Snapshot): void;
  delete(id: string): void;
  findByEntity(entity: string, entityId: string): Snapshot | null;
}

export { SnapshotRepository };