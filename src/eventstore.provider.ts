import { StoreEventBus } from "./store-event-bus";
import { StoreEventPublisher } from "./store-event-publisher";

export function createEventSourcingProviders() {
  return [StoreEventBus, StoreEventPublisher];
}
