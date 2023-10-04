import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { StoreEventBus } from "src/infrastructure/eventsource/store-event-bus";

import { __command__Command } from "../impl/__command__(kebabCase).command";

@CommandHandler(__command__Command)
export class __command__Handler implements ICommandHandler<__command__Command> {
  constructor(private readonly eventBus: StoreEventBus) {}

  async execute(data: __command__Command) {}
}
