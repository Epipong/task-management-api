import { Role } from '@prisma/client';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

const STRONG_PASSWORD_RULE = {
  minLength: 8,
  minLowercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  minUppercase: 1,
};

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  role?: Role;

  @IsStrongPassword(STRONG_PASSWORD_RULE)
  password: string;

  @IsStrongPassword(STRONG_PASSWORD_RULE)
  repeatPassword: string;
}
