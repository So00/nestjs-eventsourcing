import { Module } from "@nestjs/common";
import { AuthService } from "src/module/auth/infrastructure/auth.service";
import { AuthController } from "src/module/auth/presentation/auth.controller";
import { SharedModule } from "src/module/shared/shared.module";

export const authProviders = [AuthService];

@Module({
  imports: [SharedModule],
  controllers: [AuthController],
  providers: authProviders,
  exports: authProviders,
})
export class AuthModule {}
