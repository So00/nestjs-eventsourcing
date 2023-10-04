import { CreateUser } from "src/module/user/domain/interface/user.interface";

export class CreateUserCommand {
  constructor(public readonly payload: CreateUser) {}
}
