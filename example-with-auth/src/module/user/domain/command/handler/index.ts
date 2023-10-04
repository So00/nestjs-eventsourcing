import { CreateUserHandler } from "src/module/user/domain/command/handler/create-user.handler";
import { UpdateUserHandler } from "src/module/user/domain/command/handler/update-user.handler";

export const userCommandsHandlers = [CreateUserHandler, UpdateUserHandler];
