import { Event, Snapshot } from "./entities/event";
import { ApplicationEvents } from "./application-events";
import { StorableEvent } from "./interface/storable-event";
import { ProjectionClasses } from "./projection-classes";
export declare class EventStore {
    private readonly eventRepository;
    private readonly snapshotRepository;
    private readonly appEvents;
    private readonly projectionClasses;
    constructor(eventRepository: typeof Event, snapshotRepository: typeof Snapshot, appEvents: ApplicationEvents, projectionClasses: ProjectionClasses);
    getEvents(aggregateName: string, id: string): Promise<StorableEvent[]>;
    protected getLastSnapshot(stream: string): Promise<void>;
    getEvent(uuid: string): Promise<StorableEvent>;
    storeEvent<T extends StorableEvent>(event: T): Promise<void>;
    private getStorableEventFromPayload;
    private getStreamName;
}
