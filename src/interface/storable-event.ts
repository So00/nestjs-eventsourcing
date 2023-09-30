import { IEvent } from "@nestjs/cqrs/dist/interfaces";
import { v4 } from "uuid";

export abstract class StorableEvent implements IEvent {
  id: string;
  abstract aggregate: string;
  uuid: string;
  name: string;
  payload: any;

  protected constructor(payload, uuid?: undefined) {
    this.name = this.constructor.name;
    this.payload = payload;
    this.uuid = uuid || v4();
  }
}
