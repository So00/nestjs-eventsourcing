import { Logger } from "@nestjs/common";

export abstract class BaseException {
  logger: Logger;
  constructor() {
    this.logger = new Logger(this.constructor.name);
  }
}
