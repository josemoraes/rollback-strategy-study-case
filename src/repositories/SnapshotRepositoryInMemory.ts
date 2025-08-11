import { Snapshot } from "../entities/Snapshot";
import { SnapshotRepository } from "./SnapshotRepository";


class SnapshotRepositoryInMemoryImpl implements SnapshotRepository {
    private snapshot: Map<string, Snapshot> = new Map();

    list(): Snapshot[] {
        return Array.from(this.snapshot.values());
    }

    store(state: Snapshot): void {
        this.snapshot.set(`${state.entity}@${state.entity_id}`, state);
    }

    delete(previousStateId: string): void {
        this.snapshot.delete(previousStateId);
    }

    findByEntity(entity: string, entityId: string): Snapshot | null {
        return this.snapshot.get(`${entity}@${entityId}`) || null;
    }
}

export { SnapshotRepositoryInMemoryImpl };