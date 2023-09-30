import { DynamicModule, ForwardReference, InjectionToken, OptionalFactoryDependency, Type } from "@nestjs/common";
import { EventSourcingOptions } from "./event-sourcing";
export type RootAsyncOptions = {
    imports: (DynamicModule | Type<any> | Promise<DynamicModule> | ForwardReference<any>)[];
    useFactory: (...args: any) => Promise<EventSourcingOptions>;
    inject: (InjectionToken | OptionalFactoryDependency)[];
};
