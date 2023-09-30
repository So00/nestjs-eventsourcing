"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventNotExist = void 0;
const base_exception_1 = require("./base-exception");
class EventNotExist extends base_exception_1.BaseException {
    constructor(name) {
        super();
        this.name = name;
        this.logger.error(name);
    }
}
exports.EventNotExist = EventNotExist;
//# sourceMappingURL=event-not-exist.exception.js.map