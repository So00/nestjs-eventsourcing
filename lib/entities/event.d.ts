import { Model } from "sequelize-typescript";
export declare class Event extends Model<Event> {
    id: number;
    uuid: string;
    stream: string;
    type: string;
    data: any;
}
export declare class Snapshot extends Model<Snapshot> {
    id: number;
    stream: string;
    version: number;
    data: string;
}
export declare const EVENT_REPOSITORY: unique symbol;
export declare const SNAPSHOT_REPOSITORY: unique symbol;
export declare const eventsProvider: ({
    provide: symbol;
    useValue: typeof Event;
} | {
    provide: symbol;
    useValue: typeof Snapshot;
})[];
