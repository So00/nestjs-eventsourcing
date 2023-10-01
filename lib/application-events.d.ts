import { StorableEvent } from "./interface/storable-event";
export type ApplicationEventsConstructor = Record<"string", StorableEvent>;
export declare class ApplicationEvents {
    private readonly appEvents;
    constructor(appEvents: ApplicationEventsConstructor);
    get events(): Record<"string", StorableEvent>;
    getEventByName(name: string): any;
}
