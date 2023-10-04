import { StorableEvent } from "./interface/storable-event";
import { ProjectionClass } from "./interface/projection-class";
export declare class ProjectionClasses {
    private readonly projectionClasses;
    addProjectionClass(projectionClasses: ProjectionClass): void;
    runProjectionClass(event: StorableEvent): void;
}
