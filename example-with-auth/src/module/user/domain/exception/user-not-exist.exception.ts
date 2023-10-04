import { BaseHttpException } from "src/infrastructure/base-http-exception";

export class UserNotExistException extends BaseHttpException {
  constructor(uuid: string) {
    super(`User not exists: '${uuid}'`, 400);
  }
}
