"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EventSourcingModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSourcingModule = exports.SEQUELIZE_EVENTSOURCING = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const eventstore_1 = require("./eventstore");
const eventstore_provider_1 = require("./eventstore.provider");
const sequelize_typescript_1 = require("sequelize-typescript");
const event_1 = require("./entities/event");
const application_events_1 = require("./application-events");
const projection_classes_1 = require("./projection-classes");
exports.SEQUELIZE_EVENTSOURCING = Symbol("SEQUELIZE_EVENTSOURCING");
let EventSourcingModule = EventSourcingModule_1 = class EventSourcingModule {
    static forRoot(options) {
        return {
            module: EventSourcingModule_1,
            providers: [
                {
                    provide: exports.SEQUELIZE_EVENTSOURCING,
                    useFactory: () => EventSourcingModule_1.createEventstore(options),
                },
                {
                    provide: application_events_1.ApplicationEvents,
                    useValue: new application_events_1.ApplicationEvents(options.events),
                },
                {
                    provide: projection_classes_1.ProjectionClasses,
                    useValue: new projection_classes_1.ProjectionClasses(options.projections),
                },
                eventstore_1.EventStore,
                ...event_1.eventsProvider,
            ],
            exports: [eventstore_1.EventStore, ...event_1.eventsProvider],
            global: true,
        };
    }
    static async forRootAsync(options) {
        console.log("root");
        return {
            module: EventSourcingModule_1,
            imports: options.imports,
            providers: [
                {
                    provide: exports.SEQUELIZE_EVENTSOURCING,
                    useFactory: async (...args) => {
                        console.log("sequelize");
                        const compiledOptions = await options.useFactory(...args);
                        return EventSourcingModule_1.createEventstore(compiledOptions);
                    },
                    inject: options.inject,
                },
                {
                    provide: application_events_1.ApplicationEvents,
                    useFactory: async (...args) => {
                        const compiledOptions = await options.useFactory(...args);
                        return new application_events_1.ApplicationEvents(compiledOptions.events || {});
                    },
                    inject: options.inject,
                },
                {
                    provide: projection_classes_1.ProjectionClasses,
                    useFactory: async (...args) => {
                        const compiledOptions = await options.useFactory(...args);
                        return new projection_classes_1.ProjectionClasses(compiledOptions.projections || []);
                    },
                    inject: options.inject,
                },
                eventstore_1.EventStore,
                ...event_1.eventsProvider,
            ],
            exports: [eventstore_1.EventStore, ...event_1.eventsProvider],
            global: true,
        };
    }
    static forFeature() {
        const providers = (0, eventstore_provider_1.createEventSourcingProviders)();
        return {
            module: EventSourcingModule_1,
            imports: [cqrs_1.CqrsModule],
            providers: providers,
            exports: providers,
        };
    }
    static async createEventstore(options) {
        const sequelize = new sequelize_typescript_1.Sequelize(options.sequelize);
        sequelize.addModels([event_1.Event, event_1.Snapshot]);
        if (options.sync)
            await sequelize.sync();
        return sequelize;
    }
};
exports.EventSourcingModule = EventSourcingModule;
exports.EventSourcingModule = EventSourcingModule = EventSourcingModule_1 = __decorate([
    (0, common_1.Module)({})
], EventSourcingModule);
//# sourceMappingURL=event-sourcing.module.js.map