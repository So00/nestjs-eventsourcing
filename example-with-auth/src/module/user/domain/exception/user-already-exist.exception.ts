import { BaseHttpException } from "src/infrastructure/base-http-exception";

export class UserAlreadyExistException extends BaseHttpException {
  constructor(email: string) {
    super(`Email already exists: '${email}'`, 400);
  }
}
