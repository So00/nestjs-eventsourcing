import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/module/auth/infrastructure/auth.service";
import { User } from "src/infrastructure/database/entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.signIn(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
