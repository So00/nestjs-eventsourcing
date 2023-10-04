import { IUpdateUser } from "../../interface/IUpdateUser";

export class UpdateUserCommand {
  constructor(public readonly payload: IUpdateUser) {}
}
