"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventSourcingProviders = void 0;
const store_event_bus_1 = require("./store-event-bus");
const store_event_publisher_1 = require("./store-event-publisher");
const projection_classes_1 = require("./projection-classes");
const eventstore_1 = require("./eventstore");
function createEventSourcingProviders() {
    return [store_event_bus_1.StoreEventBus, store_event_publisher_1.StoreEventPublisher, projection_classes_1.ProjectionClasses, eventstore_1.EventStore];
}
exports.createEventSourcingProviders = createEventSourcingProviders;
//# sourceMappingURL=eventstore.provider.js.map