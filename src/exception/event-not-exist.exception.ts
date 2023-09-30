import { BaseException } from "./base-exception";

export class EventNotExist extends BaseException {
  constructor(protected readonly name: string) {
    super();
    this.logger.error(name);
  }
}
