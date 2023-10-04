import { LocalStrategy } from "./local.strategy";
import { LocalAuthGuard } from "./local.guard";
import { AuthService } from "src/module/auth/infrastructure/auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from "./jwt.guard";
import { RefreshStrategy } from "./refresh.strategy";
import { RefreshAuthGuard } from "./refresh.guard";

export const authProviders = [
  LocalAuthGuard,
  LocalStrategy,
  AuthService,
  JwtStrategy,
  JwtAuthGuard,
  RefreshStrategy,
  RefreshAuthGuard,
];
