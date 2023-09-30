import { StoreEventBus } from "./store-event-bus";
import { AggregateRoot } from "@nestjs/cqrs";
export interface Constructor<T> {
    new (...args: any[]): T;
}
export declare class StoreEventPublisher {
    private readonly eventBus;
    constructor(eventBus: StoreEventBus);
    mergeClassContext<T extends Constructor<AggregateRoot>>(metatype: T): T;
    mergeObjectContext<T extends AggregateRoot>(object: T): T;
}
