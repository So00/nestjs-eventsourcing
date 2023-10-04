import { SequelizeOptions } from "sequelize-typescript";
import { StorableEvent } from "./storable-event";
export interface EventSourcingOptions {
    sequelize: SequelizeOptions;
    sync?: boolean;
    events?: Record<"string", StorableEvent>;
}
