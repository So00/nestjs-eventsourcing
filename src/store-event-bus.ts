import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { IEvent, IEventBus } from "@nestjs/cqrs/dist/interfaces";

import { EventStore } from "./eventstore";
import { StorableEvent } from "./interface/storable-event";

@Injectable()
export class StoreEventBus implements IEventBus {
  constructor(
    private readonly eventBus: EventBus,
    private readonly eventStore: EventStore,
  ) {}

  publish<T extends IEvent>(event: T): void {
    const storableEvent = event as any as StorableEvent;
    if (
      storableEvent.id === undefined ||
      storableEvent.aggregate === undefined
    ) {
      throw new Error("Events must implement StorableEvent interface");
    }
    this.eventStore
      .storeEvent(storableEvent)
      .then(() => this.eventBus.publish(event))
      .catch((err) => {
        throw err;
      });
  }

  publishAll(events: IEvent[]): void {
    events.forEach((event) => this.publish(event));
  }
}
