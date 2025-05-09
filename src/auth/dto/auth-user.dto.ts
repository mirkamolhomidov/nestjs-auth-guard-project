import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  name: string;
}

export class LoginUserDto {
  @IsEmail()
  @IsString()
  email: string;
  @IsString()
  password: string;
}
