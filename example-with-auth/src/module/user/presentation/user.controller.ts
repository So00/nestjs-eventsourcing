import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

import { CreateDto } from "src/module/user/presentation/dto/create.dto";
import {
  CreateUserCommand,
  UpdateUserCommand,
} from "src/module/user/domain/command/impl";
import { JwtAuthGuard } from "../../../infrastructure/auth/jwt.guard";
import {
  IUserRepository,
  IUserRepositoryToken,
} from "../infrastructure/user.repository";
import { UpdateDto } from "./dto/update.dto";

@Controller({
  path: "user",
  version: "1",
})
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  @Post()
  createUser(@Body() payload: CreateDto, @Request() req) {
    const callerUid = req.user.uuid;
    return this.commandBus.execute(
      new CreateUserCommand({ ...payload, callerUid }),
    );
  }

  @Patch(":uuid")
  updateUser(
    @Body() payload: UpdateDto,
    @Request() req,
    @Param("uuid") uuid: string,
  ) {
    const callerUid = req.user.uuid;
    return this.commandBus.execute(
      new UpdateUserCommand({ ...payload, uuid, callerUid }),
    );
  }

  @Get()
  async getUsers(
    @Query("partialMail", new DefaultValuePipe(undefined)) partialMail,
    @Query("limit", new DefaultValuePipe(20), new ParseIntPipe()) limit,
    @Query("offset", new DefaultValuePipe(0), new ParseIntPipe()) offset,
  ) {
    return await this.userRepository.getPartialWithEmail(
      partialMail,
      limit,
      offset,
    );
  }

  @Get(":uuid")
  async getSpecificUser(@Param("uuid") uuid: string) {
    return await this.userRepository.getOneByUid(uuid);
  }
}
