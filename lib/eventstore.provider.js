"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventSourcingProviders = void 0;
const store_event_bus_1 = require("./store-event-bus");
const store_event_publisher_1 = require("./store-event-publisher");
function createEventSourcingProviders() {
    return [store_event_bus_1.StoreEventBus, store_event_publisher_1.StoreEventPublisher];
}
exports.createEventSourcingProviders = createEventSourcingProviders;
//# sourceMappingURL=eventstore.provider.js.map