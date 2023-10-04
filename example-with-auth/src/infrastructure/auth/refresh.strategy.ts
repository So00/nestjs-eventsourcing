import { Strategy } from "passport-strategy";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/module/auth/infrastructure/auth.service";
import { Request } from "express";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "refresh") {
  constructor(private authService: AuthService) {
    super();
  }

  async authenticate(req: Request, options?: any) {
    const user = await this.authService.refresh(req.body.refreshToken);
    if (!user) return this.error(new UnauthorizedException());
    const { password, refreshToken, ...rest } = user;

    return this.success(rest, {});
  }

  success(user: any, info?: any) {
    super.success(user, info);
  }

  error(error) {
    super.error(error);
  }
}
