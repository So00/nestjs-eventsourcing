"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorableEvent = void 0;
const uuid_1 = require("uuid");
class StorableEvent {
    constructor(payload, uuid) {
        this.name = this.constructor.name;
        this.payload = payload;
        this.uuid = uuid || (0, uuid_1.v4)();
    }
}
exports.StorableEvent = StorableEvent;
//# sourceMappingURL=storable-event.js.map