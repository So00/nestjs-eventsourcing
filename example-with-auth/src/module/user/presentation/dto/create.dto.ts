import { IsEmail, IsString } from "class-validator";

export class CreateDto {
  @IsString()
  lastName: string;

  @IsString()
  firstName: string;

  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
