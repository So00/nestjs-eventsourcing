import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import * as sha256 from "sha256";
import { Inject, Logger } from "@nestjs/common";
import { StoreEventBus } from "@atournerie/nestjs-eventsourcing";

import { UpdateUserCommand } from "../impl/update-user.command";
import {
  IUserRepository,
  IUserRepositoryToken,
} from "../../../infrastructure/user.repository";
import { UserNotExistException } from "../../exception/user-not-exist.exception";
import { UserUpdatedEvent } from "../../event/impl";
import { ConfigService } from "@nestjs/config";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  private logger = new Logger(UpdateUserHandler.name);

  constructor(
    private readonly eventBus: StoreEventBus,
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute({ payload }: UpdateUserCommand) {
    this.logger.log("Start of command");
    const user = await this.userRepository.aggregateById(payload.uuid);
    if (user.empty) throw new UserNotExistException(payload.uuid);
    if (payload.password === "" || payload.password === undefined)
      delete payload.password;
    if (payload.password)
      payload.password = sha256(
        this.configService.get("app.salt") + payload.password,
      );
    this.eventBus.publish(new UserUpdatedEvent(payload));
    this.logger.log("End of command");
  }
}
