import { Injectable } from "@nestjs/common";
import { EventNotExist } from "./exception/event-not-exist.exception";
import { StorableEvent } from "./interface/storable-event";

export type ApplicationEventsConstructor = Record<"string", StorableEvent>;

@Injectable()
export class ApplicationEvents {
  constructor(private readonly appEvents: ApplicationEventsConstructor) {}

  get events(): Record<"string", StorableEvent> {
    return this.appEvents;
  }

  getEventByName(name: string) {
    if (!this.appEvents[name]) throw new EventNotExist(name);
    return this.appEvents[name];
  }
}
