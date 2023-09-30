"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectionClass = void 0;
class ProjectionClass {
    handleIfPossible(event) {
        if (this.canHandle(event.name))
            this.handle(event);
    }
    canHandle(eventName) {
        return typeof this[`on${eventName}`] === "function";
    }
    handle(event) {
        this[`on${event.name}`](event);
    }
}
exports.ProjectionClass = ProjectionClass;
//# sourceMappingURL=projection-class.js.map