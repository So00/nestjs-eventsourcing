import { Module, DynamicModule } from "@nestjs/common";
import { EventSourcingOptions } from "./interface/event-sourcing";
import { createEventSourcingProviders } from "./eventstore.provider";
import { Sequelize } from "sequelize-typescript";
import { RootAsyncOptions } from "./interface/root-async-options";
import { Event, eventsProvider, Snapshot } from "./entities/event";
import {
  ApplicationEvents,
  ApplicationEventsConstructor,
} from "./application-events";
import { CqrsModule } from "@nestjs/cqrs";

export const SEQUELIZE_EVENTSOURCING = Symbol("SEQUELIZE_EVENTSOURCING");

const providers = createEventSourcingProviders();
const applicationEvents = new ApplicationEvents();

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
          useFactory: () => {
            applicationEvents.addEvents(
              options.events || ({} as ApplicationEventsConstructor),
            );
            return applicationEvents;
          },
        },
        ...providers,
        ...eventsProvider,
      ],
      exports: [...eventsProvider, ...providers],
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
            applicationEvents.addEvents(
              compiledOptions.events || ({} as ApplicationEventsConstructor),
            );
            return applicationEvents;
          },
          inject: options.inject,
        },
        ...providers,
        ...eventsProvider,
      ],
      exports: [...eventsProvider, ...providers],
      global: true,
    };
  }

  static forFeature(): DynamicModule {
    return {
      module: EventSourcingModule,
      imports: [CqrsModule],
      providers: [
        ...providers,
        ...eventsProvider,
        { provide: ApplicationEvents, useValue: applicationEvents },
      ],
      exports: [
        ...providers,
        ...eventsProvider,
        { provide: ApplicationEvents, useValue: applicationEvents },
        CqrsModule,
      ],
    };
  }

  protected static async createEventstore(options: EventSourcingOptions) {
    const sequelize = new Sequelize(options.sequelize);
    sequelize.addModels([Event, Snapshot]);
    if (options.sync) await sequelize.sync();
    return sequelize;
  }
}
