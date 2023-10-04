import { Inject, Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import * as sha256 from "sha256";
import { v4 } from "uuid";

import { StoreEventBus } from "@atournerie/nestjs-eventsourcing";
import { CreateUserCommand } from "src/module/user/domain/command/impl/create-user.command";
import {
  IUserRepository,
  IUserRepositoryToken,
} from "src/module/user/infrastructure/user.repository";
import { UserCreatedEvent } from "src/module/user/domain/event/impl/user-created.event";
import { UserAlreadyExistException } from "src/module/user/domain/exception/user-already-exist.exception";
import { ConfigService } from "@nestjs/config";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  private logger = new Logger(CreateUserHandler.name);

  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
    private readonly eventBus: StoreEventBus,
    private readonly configService: ConfigService,
  ) {}

  async execute({ payload }: CreateUserCommand) {
    this.logger.log("Start of command");
    if (await this.userRepository.getByEmail(payload.email))
      throw new UserAlreadyExistException(payload.email);
    const password = sha256(
      this.configService.get("app.salt") + payload.password,
    );
    const uuid = v4();
    const event = new UserCreatedEvent({ ...payload, uuid, password });
    this.eventBus.publish(event);
    this.logger.log("End of command");
    return { uuid };
  }
}
