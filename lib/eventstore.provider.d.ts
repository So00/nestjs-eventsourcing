import { StoreEventBus } from "./store-event-bus";
import { StoreEventPublisher } from "./store-event-publisher";
export declare function createEventSourcingProviders(): (typeof StoreEventBus | typeof StoreEventPublisher)[];
