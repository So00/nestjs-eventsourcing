import { Controller, Request, Post, UseGuards, Get } from "@nestjs/common";
import { LocalAuthGuard } from "src/infrastructure/auth/local.guard";
import { AuthService } from "src/module/auth/infrastructure/auth.service";
import { JwtAuthGuard } from "src/infrastructure/auth/jwt.guard";
import { RefreshAuthGuard } from "src/infrastructure/auth/refresh.guard";

@Controller({
  path: "auth",
  version: "1",
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("info")
  async me(@Request() req) {
    return { user: req.user };
  }

  @UseGuards(RefreshAuthGuard)
  @Post("refresh")
  async refresh(@Request() req) {
    return this.authService.login(req.user, true);
  }
}
