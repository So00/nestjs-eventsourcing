import { StoreEventBus } from "./store-event-bus";
import { StoreEventPublisher } from "./store-event-publisher";
import { ProjectionClasses } from "./projection-classes";
import { EventStore } from "./eventstore";

export function createEventSourcingProviders() {
  return [StoreEventBus, StoreEventPublisher, ProjectionClasses, EventStore];
}
