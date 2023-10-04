"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationEvents = void 0;
const common_1 = require("@nestjs/common");
const event_not_exist_exception_1 = require("./exception/event-not-exist.exception");
let ApplicationEvents = class ApplicationEvents {
    addEvents(events) {
        this.appEvents = Object.assign(Object.assign({}, this.appEvents), events);
    }
    get events() {
        return this.appEvents;
    }
    getEventByName(name) {
        if (!this.appEvents[name])
            throw new event_not_exist_exception_1.EventNotExist(name);
        return this.appEvents[name];
    }
};
exports.ApplicationEvents = ApplicationEvents;
exports.ApplicationEvents = ApplicationEvents = __decorate([
    (0, common_1.Injectable)()
], ApplicationEvents);
//# sourceMappingURL=application-events.js.map