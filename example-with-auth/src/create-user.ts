import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { CommandBus } from "@nestjs/cqrs";
import { CreateUserCommand } from "./module/user/domain/command/impl";
import { Logger } from "./logger/logger";

// Launch from app
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const commandBus = app.get(CommandBus);
  const logger = app.get(Logger);

  await commandBus.execute(
    new CreateUserCommand({
      email: "admin@admin.ts",
      firstName: "asd",
      lastName: "asd",
      username: "asd",
      password: "asd",
      callerUid: "commandLine",
    }),
  );
  logger.log("Command done");

  setTimeout(async () => app.close(), 2000);
}

bootstrap();
