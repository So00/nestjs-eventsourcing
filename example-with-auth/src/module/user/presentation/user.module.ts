import { Module } from "@nestjs/common";

import { UserController } from "src/module/user/presentation/user.controller";
import { userCommandsHandlers } from "src/module/user/domain/command/handler";
import { UserProjection } from "src/module/user/domain/projection/user.projection";
import { SharedModule } from "../../shared/shared.module";
import { EventSourcingModule } from "@atournerie/nestjs-eventsourcing";

const providers = [...userCommandsHandlers, UserProjection];

@Module({
  imports: [SharedModule, EventSourcingModule.forFeature()],
  controllers: [UserController],
  providers,
  exports: providers,
})
export class UserModule {}
