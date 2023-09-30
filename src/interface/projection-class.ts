import { StorableEvent } from "./storable-event";

export interface IProjectionClass {
  handleIfPossible(event: StorableEvent);
  canHandle(eventName: string);
  handle(event: StorableEvent);
}

export abstract class ProjectionClass implements IProjectionClass {
  handleIfPossible(event: StorableEvent) {
    if (this.canHandle(event.name)) this.handle(event);
  }

  canHandle(eventName: string) {
    return typeof this[`on${eventName}`] === "function";
  }

  handle(event: StorableEvent) {
    this[`on${event.name}`](event);
  }
}
