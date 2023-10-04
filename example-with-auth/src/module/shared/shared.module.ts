import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { EventSourcingModule } from "@atournerie/nestjs-eventsourcing";

import { databaseProvider } from "../../infrastructure/database/database.provider";
import { authProviders } from "../../infrastructure/auth";
import { UserRepositoryProviders } from "../user/infrastructure/user.repository";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
  imports: [
    EventSourcingModule.forFeature(),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("app.jwtSecretKey"),
        signOptions: { expiresIn: "3600s" },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    CqrsModule,
  ],
  controllers: [],
  providers: [
    ConfigService,
    ...databaseProvider,
    ...authProviders,
    ...UserRepositoryProviders,
    PassportModule,
    JwtModule,
  ],
  exports: [
    ConfigService,
    EventSourcingModule.forFeature(),
    ...databaseProvider,
    ...authProviders,
    ...UserRepositoryProviders,
    JwtModule,
    PassportModule,
    CqrsModule,
  ],
})
export class SharedModule {}
