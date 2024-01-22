"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStore = void 0;
const common_1 = require("@nestjs/common");
const event_1 = require("./entities/event");
const application_events_1 = require("./application-events");
const projection_classes_1 = require("./projection-classes");
let EventStore = class EventStore {
    constructor(eventRepository, snapshotRepository, appEvents, projectionClasses) {
        this.eventRepository = eventRepository;
        this.snapshotRepository = snapshotRepository;
        this.appEvents = appEvents;
        this.projectionClasses = projectionClasses;
    }
    async getEvents(aggregateName, id) {
        const events = await this.eventRepository.findAll({
            where: {
                stream: this.getStreamName(aggregateName, id),
            },
        });
        const storableEvents = events.map((event) => {
            return this.getStorableEventFromPayload(event.dataValues);
        });
        return storableEvents;
    }
    async getLastSnapshot(stream) {
        throw new Error("Not implemented");
    }
    async getEvent(uuid) {
        const event = await this.eventRepository.findOne({ where: { uuid } });
        return this.getStorableEventFromPayload(event.dataValues);
    }
    async storeEvent(event) {
        const { aggregate, name, id, payload, uuid } = event;
        try {
            const { dataValues: { createdAt }, } = await event_1.Event.create({
                uuid,
                stream: this.getStreamName(aggregate, id),
                type: name,
                data: payload,
            });
            this.projectionClasses.runProjectionClass(Object.assign(Object.assign({}, event), { createdAt }));
        }
        catch (error) {
            console.warn(error);
        }
    }
    getStorableEventFromPayload(event) {
        const eventInstance = this.appEvents.getEventByName(event.type);
        return new eventInstance(JSON.parse(event.data));
    }
    getStreamName(stream, id) {
        return `${stream}-${id}`;
    }
};
exports.EventStore = EventStore;
exports.EventStore = EventStore = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(event_1.EVENT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(event_1.SNAPSHOT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, application_events_1.ApplicationEvents,
        projection_classes_1.ProjectionClasses])
], EventStore);
//# sourceMappingURL=eventstore.js.map