import { Inject, Injectable } from "@nestjs/common";
import { In, Like, Repository } from "typeorm";
import * as sha256 from "sha256";
import { EventStore } from "@atournerie/nestjs-eventsourcing";

import {
  User as UserEntity,
  USER_MODEL_REPOSITORY,
} from "src/infrastructure/database/entities/user.entity";
import { IUser } from "src/module/user/domain/interface/user.interface";
import { ConfigService } from "@nestjs/config";
import { User } from "../domain/user.aggregate";
import { USER_AGGREGATE_NAME } from "../domain/event/enum";

export interface IUserRepository {
  aggregateById(id: string): Promise<User>;
  getByUuids(uuids: string[]): Promise<UserEntity[]>;
  getOneByUid(uuid: string): Promise<UserEntity>;
  create(payload: IUser): Promise<UserEntity>;
  update(uuid: string, payload: Partial<Omit<IUser, "uuid">>);
  getByEmail(email: string): Promise<UserEntity>;
  getByEmailWithPassword(email: string): Promise<UserEntity>;
  updateRefreshToken(uuid: string, refresh: string): Promise<UserEntity>;
  getByRefreshToken(token: string): Promise<UserEntity>;
  getPartialWithEmail(
    email: string,
    limit: number,
    offset: number,
  ): Promise<UserEntity[]>;
}

export const IUserRepositoryToken = Symbol("IUserRepository");

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly eventStore: EventStore,
    @Inject(USER_MODEL_REPOSITORY)
    private readonly user: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  async aggregateById(id: string) {
    const user = new User(id);
    user.loadFromHistory(
      await this.eventStore.getEvents(USER_AGGREGATE_NAME, id),
    );
    return user;
  }

  async getByUuids(uuids: string[]): Promise<UserEntity[]> {
    return await this.user.find({ where: { uuid: In(uuids) } });
  }

  async getOneByUid(uuid: string): Promise<UserEntity> {
    return await this.user.findOne({ where: { uuid } });
  }

  async create(payload: IUser) {
    const user = this.user.create(payload);
    await this.user.save(user);
    return user;
  }

  async update(uuid: string, payload: Partial<Omit<IUser, "uuid">>) {
    return await this.user
      .createQueryBuilder()
      .update(UserEntity)
      .set({ ...payload })
      .where({ uuid })
      .execute();
  }

  async getByEmailWithPassword(email: string) {
    const query = this.user
      .createQueryBuilder("user")
      .where({ email })
      .addSelect("user.password")
      .addSelect("user.refreshToken");
    return query.getOne();
  }

  async getByEmail(email: string) {
    return await this.user.findOne({ where: { email } });
  }

  async getPartialWithEmail(email: string, limit: number, offset: number) {
    const query = this.user.createQueryBuilder();
    if (email) query.where({ email: Like(`%${email}%`) });
    query.limit(limit).offset(offset);
    return query.getMany();
  }

  async updateRefreshToken(uuid: string, refresh: string) {
    const user = await this.getOneByUid(uuid);
    user.refreshToken = sha256(this.configService.get("app.salt") + refresh);
    await this.user.save(user);
    return user;
  }

  async getByRefreshToken(token: string) {
    return await this.user.findOne({
      where: {
        refreshToken: sha256(this.configService.get("app.salt") + token),
      },
    });
  }
}

export const UserRepositoryProviders = [
  {
    provide: IUserRepositoryToken,
    useClass: UserRepository,
  },
];
