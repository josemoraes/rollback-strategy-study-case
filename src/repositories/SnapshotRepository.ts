import { Snapshot } from "../entities/Snapshot";

interface SnapshotRepository {
  store(state: Snapshot): void;
  findByEntity(entity: string, entityId: string): Snapshot | null;
}

export { SnapshotRepository };