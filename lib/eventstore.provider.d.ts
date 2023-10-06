import { StoreEventBus } from "./store-event-bus";
import { StoreEventPublisher } from "./store-event-publisher";
import { ProjectionClasses } from "./projection-classes";
import { EventStore } from "./eventstore";
export declare function createEventSourcingProviders(): (typeof ProjectionClasses | typeof EventStore | typeof StoreEventBus | typeof StoreEventPublisher)[];
