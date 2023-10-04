import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as sha256 from "sha256";
import { JwtService } from "@nestjs/jwt";
import { generate } from "randomstring";

import {
  IUserRepository,
  IUserRepositoryToken,
} from "src/module/user/infrastructure/user.repository";
import { User } from "src/infrastructure/database/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly usersService: IUserRepository,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.getByEmailWithPassword(email);
    if (
      user?.password !== sha256(this.configService.get("app.salt") + password)
    ) {
      return null;
    }
    const { password: _, refreshToken, ...result } = user;
    return result;
  }

  async login(user: User, refresh = false) {
    const payload = {
      access_token: this.jwtService.sign(user),
    };

    if (!refresh) {
      const refreshToken = generate(240);
      await this.usersService.updateRefreshToken(user.uuid, refreshToken);
      payload["refresh_token"] = refreshToken;
    }

    return payload;
  }

  async refresh(refresh: string) {
    return await this.usersService.getByRefreshToken(refresh);
  }
}
