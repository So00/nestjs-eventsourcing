import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {
  EventSourcingModule,
  EventSourcingOptions,
  StorableEvent,
} from "@atournerie/nestjs-eventsourcing";
import { WinstonModule } from "nest-winston";
import { format, transports } from "winston";

import configs from "src/config";
import * as Events from "./domain/events";
import { SharedModule } from "./module/shared/shared.module";
import { ApiModule } from "./presentation/api/api.module";
import { Logger } from "src/logger/logger";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
    }),
    WinstonModule.forRoot({
      format: format.combine(format.timestamp(), format.ms(), format.json()),
      transports: [new transports.Console()],
    }),
    EventSourcingModule.forRootAsync({
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<EventSourcingOptions> => {
        const config = configService.get("database");
        return {
          sequelize: {
            dialect: "mysql",
            host: config.host,
            port: config.port,
            username: config.username,
            password: config.password,
            database: config.eventstoreDatabase,
          },
          sync: true,
          events: Events as unknown as Record<"string", StorableEvent>,
        };
      },
    }),
    ApiModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
