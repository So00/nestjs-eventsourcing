import { Injectable } from "@nestjs/common";
import { StorableEvent } from "./interface/storable-event";
import { ProjectionClass } from "./interface/projection-class";

@Injectable()
export class ProjectionClasses {
  constructor(private readonly projectionClasses: ProjectionClass[] = []) {}

  runProjectionClass(event: StorableEvent) {
    for (const projectionClass of this.projectionClasses) {
      projectionClass.handleIfPossible(event);
    }
  }
}
