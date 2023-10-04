import { Inject, Injectable, Logger } from "@nestjs/common";
import {
  ProjectionClass,
  ProjectionClasses,
} from "@atournerie/nestjs-eventsourcing";

import {
  IUserRepository,
  IUserRepositoryToken,
} from "src/module/user/infrastructure/user.repository";
import { UserCreatedEvent } from "src/module/user/domain/event/impl";
import { UserUpdatedEvent } from "src/module/user/domain/event/impl/user-updated.event";

@Injectable()
export class UserProjection extends ProjectionClass {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly projectionClasses: ProjectionClasses,
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {
    super();
    this.projectionClasses.addProjectionClass(this);
  }

  async onUserCreatedEvent(event: UserCreatedEvent) {
    try {
      this.logger.log("Event started");
      const { payload } = event;
      await this.userRepository.create(payload);
      this.logger.log("Event finished");
    } catch (e) {
      this.logger.error("An error has been thrown", { e });
    }
  }

  async onUserUpdatedEvent(event: UserUpdatedEvent) {
    try {
      this.logger.log("Event started UserUpdatedEvent");
      const { payload } = event;
      const { uuid, callerUid, ...rest } = payload;
      await this.userRepository.update(uuid, rest);
      this.logger.log("Event finished UserUpdatedEvent");
    } catch (e) {
      this.logger.error(`An error has been thrown ${e.message}`);
    }
  }
}
