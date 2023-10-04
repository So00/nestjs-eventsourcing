import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { User, userProviders } from "./entities/user.entity";

export const databaseProvider = [
  {
    provide: DataSource,
    useFactory: async (configService: ConfigService) => {
      const config = configService.get("database");
      const appEnv = configService.get("app.env");
      const dataSource = new DataSource({
        type: "mysql",
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        entities: [User],
        synchronize: appEnv !== "production",
      });

      return await dataSource.initialize();
    },
    inject: [ConfigService],
  },
  ...userProviders,
];
