import { StorableEvent } from "./interface/storable-event";
import { ProjectionClass } from "./interface/projection-class";
export declare class ProjectionClasses {
    private readonly projectionClasses;
    constructor(projectionClasses?: ProjectionClass[]);
    runProjectionClass(event: StorableEvent): void;
}
