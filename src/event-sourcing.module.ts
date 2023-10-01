import { Module, DynamicModule } from "@nestjs/common";
import { EventSourcingOptions } from "./interface/event-sourcing";
import { CqrsModule } from "@nestjs/cqrs";
import { EventStore } from "./eventstore";
import { createEventSourcingProviders } from "./eventstore.provider";
import { Sequelize } from "sequelize-typescript";
import { RootAsyncOptions } from "./interface/root-async-options";
import { Event, eventsProvider, Snapshot } from "./entities/event";
import {
  ApplicationEvents,
  ApplicationEventsConstructor,
} from "./application-events";
import { ProjectionClasses } from "./projection-classes";

export const SEQUELIZE_EVENTSOURCING = Symbol("SEQUELIZE_EVENTSOURCING");

@Module({})
export class EventSourcingModule {
  static forRoot(options: EventSourcingOptions): DynamicModule {
    return {
      module: EventSourcingModule,
      providers: [
        {
          provide: SEQUELIZE_EVENTSOURCING,
          useFactory: () => EventSourcingModule.createEventstore(options),
        },
        {
          provide: ApplicationEvents,
          useValue: new ApplicationEvents(options.events),
        },
        {
          provide: ProjectionClasses,
          useValue: new ProjectionClasses(options.projections),
        },
        EventStore,
        ...eventsProvider,
      ],
      exports: [EventStore, ...eventsProvider],
      global: true,
    };
  }

  static async forRootAsync(options: RootAsyncOptions): Promise<DynamicModule> {
    return {
      module: EventSourcingModule,
      imports: options.imports,
      providers: [
        {
          provide: SEQUELIZE_EVENTSOURCING,
          useFactory: async (...args: typeof options.inject) => {
            const compiledOptions = await options.useFactory(...args);
            return EventSourcingModule.createEventstore(compiledOptions);
          },
          inject: options.inject,
        },
        {
          provide: ApplicationEvents,
          useFactory: async (...args: typeof options.inject) => {
            const compiledOptions = await options.useFactory(...args);
            return new ApplicationEvents(
              compiledOptions.events || ({} as ApplicationEventsConstructor),
            );
          },
          inject: options.inject,
        },
        {
          provide: ProjectionClasses,
          useFactory: async (...args: typeof options.inject) => {
            const compiledOptions = await options.useFactory(...args);
            return new ProjectionClasses(compiledOptions.projections || []);
          },
          inject: options.inject,
        },
        EventStore,
        ...eventsProvider,
      ],
      exports: [EventStore, ...eventsProvider],
      global: true,
    };
  }

  static forFeature(): DynamicModule {
    const providers = createEventSourcingProviders();
    return {
      module: EventSourcingModule,
      imports: [CqrsModule],
      providers: providers,
      exports: providers,
    };
  }

  protected static async createEventstore(options: EventSourcingOptions) {
    const sequelize = new Sequelize(options.sequelize);
    sequelize.addModels([Event, Snapshot]);
    if (options.sync) await sequelize.sync();
    return sequelize;
  }
}
