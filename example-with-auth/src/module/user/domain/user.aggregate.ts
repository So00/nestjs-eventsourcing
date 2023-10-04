import { AggregateRoot } from "@nestjs/cqrs";
import { UserCreatedEvent, UserUpdatedEvent } from "./event/impl";

export class User extends AggregateRoot {
  protected readonly id: string;

  public empty = true;

  constructor(id: string) {
    super();
    this.id = id;
  }

  onUserCreatedEvent({ payload }: UserCreatedEvent) {
    this.empty = false;
  }

  onUserUpdatedEvent({ payload }: UserUpdatedEvent) {}
}
