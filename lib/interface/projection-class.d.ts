import { StorableEvent } from "./storable-event";
export interface IProjectionClass {
    handleIfPossible(event: StorableEvent): any;
    canHandle(eventName: string): any;
    handle(event: StorableEvent): any;
}
export declare abstract class ProjectionClass implements IProjectionClass {
    handleIfPossible(event: StorableEvent): void;
    canHandle(eventName: string): boolean;
    handle(event: StorableEvent): void;
}
