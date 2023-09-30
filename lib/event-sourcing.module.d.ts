import { DynamicModule } from "@nestjs/common";
import { EventSourcingOptions } from "./interface/event-sourcing";
import { Sequelize } from "sequelize-typescript";
import { RootAsyncOptions } from "./interface/root-async-options";
export declare const SEQUELIZE_EVENTSOURCING: unique symbol;
export declare class EventSourcingModule {
    static forRoot(options: EventSourcingOptions): DynamicModule;
    static forRootAsync(options: RootAsyncOptions): Promise<DynamicModule>;
    static forFeature(): DynamicModule;
    protected static createEventstore(options: EventSourcingOptions): Promise<Sequelize>;
}
