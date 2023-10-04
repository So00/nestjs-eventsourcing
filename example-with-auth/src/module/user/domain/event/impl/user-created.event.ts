import { StorableEvent } from "@atournerie/nestjs-eventsourcing";
import { UserCreated } from "src/module/user/domain/interface/user.interface";
import { USER_AGGREGATE_NAME } from "src/module/user/domain/event/enum";

export class UserCreatedEvent extends StorableEvent {
  aggregate = USER_AGGREGATE_NAME;

  constructor(readonly payload: UserCreated) {
    super(payload);
    this.id = payload.uuid;
  }
}
