import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateDto {
  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  password: string;
}
