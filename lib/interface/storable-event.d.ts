import { IEvent } from "@nestjs/cqrs/dist/interfaces";
export declare abstract class StorableEvent implements IEvent {
    id: string;
    abstract aggregate: string;
    uuid: string;
    name: string;
    payload: any;
    createdAt?: Date;
    protected constructor(payload: any, uuid?: undefined);
}
