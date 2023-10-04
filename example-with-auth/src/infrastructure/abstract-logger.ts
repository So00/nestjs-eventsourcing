import { Logger } from "@nestjs/common";

export abstract class AbstractLogger {
  protected readonly logger = new Logger(this.constructor.name);
}
