import { SequelizeOptions } from "sequelize-typescript";
import { StorableEvent } from "./storable-event";
import { ProjectionClass } from "./projection-class";
export interface EventSourcingOptions {
    sequelize: SequelizeOptions;
    sync?: boolean;
    events?: Record<"string", StorableEvent>;
    projections?: ProjectionClass[];
}
