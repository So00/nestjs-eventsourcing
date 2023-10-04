import { Inject } from "@nestjs/common";
import {
  WinstonLogger as NestWinstonLogger,
  WINSTON_MODULE_PROVIDER,
} from "nest-winston";
import { Logger as WinstonLogger } from "winston";

export class Logger extends NestWinstonLogger {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) logger: WinstonLogger) {
    super(logger);
  }

  log(message: any, context?: string) {
    return super.log(message, context);
  }

  warn(message: any, context?: string) {
    return super.warn(message, context);
  }

  debug(message: any, context?: string) {
    return super.debug(message, context);
  }

  verbose(message: any, context?: string) {
    return super.verbose(message, context);
  }

  error(message: any, trace?: string, context?: string) {
    return super.error(message, trace, context);
  }
}
