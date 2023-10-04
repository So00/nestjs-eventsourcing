import { HttpException, Logger } from "@nestjs/common";

export abstract class BaseHttpException extends HttpException {
  private readonly logger = new Logger(this.constructor.name);

  protected constructor(message, httpCode) {
    super(message, httpCode);
    this.logger.warn(`Error has been thrown: ${message}`);
  }
}
