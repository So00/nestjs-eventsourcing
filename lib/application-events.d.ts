import { StorableEvent } from "./interface/storable-event";
export type ApplicationEventsConstructor = Record<"string", StorableEvent>;
export declare class ApplicationEvents {
    private appEvents;
    addEvents(events: ApplicationEventsConstructor): void;
    get events(): Record<"string", StorableEvent>;
    getEventByName(name: string): any;
}
