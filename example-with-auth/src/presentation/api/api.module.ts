import { Module } from "@nestjs/common";

import { UserModule } from "src/module/user/presentation/user.module";
import { AuthModule } from "src/module/auth/presentation/auth.module";
import { SharedModule } from "src/module/shared/shared.module";

@Module({
  imports: [SharedModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
