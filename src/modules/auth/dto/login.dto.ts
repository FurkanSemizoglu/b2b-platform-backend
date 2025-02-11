import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  SUPPLIER = 'SUPPLIER'
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
} 