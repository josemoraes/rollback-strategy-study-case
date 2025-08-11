import { SnapshotRepository } from "../../repositories/SnapshotRepository";
import { Snapshot } from "../../entities/Snapshot";

class SnapshotsUseCases {
  constructor(private readonly snapshotRepository: SnapshotRepository) {}

  createSnapshot(snapshot: Snapshot) {
    this.snapshotRepository.store(snapshot);
  }

  getSnapshot(entity: string, entityId: string) {
    return this.snapshotRepository.findByEntity(entity, entityId);
  }
}

export default SnapshotsUseCases;