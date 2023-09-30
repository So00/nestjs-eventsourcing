import { EventBus } from "@nestjs/cqrs";
import { IEvent, IEventBus } from "@nestjs/cqrs/dist/interfaces";
import { EventStore } from "./eventstore";
export declare class StoreEventBus implements IEventBus {
    private readonly eventBus;
    private readonly eventStore;
    constructor(eventBus: EventBus, eventStore: EventStore);
    publish<T extends IEvent>(event: T): void;
    publishAll(events: IEvent[]): void;
}
