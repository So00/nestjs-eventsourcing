import { Inject, Injectable, Logger } from "@nestjs/common";

import { ProjectionAbstract } from "src/domain/projection.abstract";

@Injectable()
export class __domain__Projection extends ProjectionAbstract {
  private readonly logger = new Logger(this.constructor.name);

  constructor() {
    super();
  }
}
