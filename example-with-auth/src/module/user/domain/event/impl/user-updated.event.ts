import { StorableEvent } from "@atournerie/nestjs-eventsourcing";

import { IUserUpdated } from "../../interface/IUserUpdated";
import { USER_AGGREGATE_NAME } from "../enum";

export class UserUpdatedEvent extends StorableEvent {
  aggregate = USER_AGGREGATE_NAME;

  constructor(readonly payload: IUserUpdated) {
    super(payload);
    this.id = payload.uuid;
  }
}
