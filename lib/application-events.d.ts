import { StorableEvent } from "./interface/storable-event";
export declare class ApplicationEvents {
    private readonly appEvents;
    constructor(appEvents: Record<"string", StorableEvent>);
    get events(): Record<"string", StorableEvent>;
    getEventByName(name: string): any;
}
