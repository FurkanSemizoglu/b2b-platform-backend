import { IsEmail, IsString, MinLength, IsInt, Min, IsEnum, ValidateIf } from 'class-validator';
import { UserRole } from './login.dto';

export class RegisterDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsInt()
  @Min(18)
  age: number;

  @IsEnum(UserRole)
  role: UserRole;

  @ValidateIf(o => o.role === UserRole.SUPPLIER)
  @IsString()
  companyName?: string;
} 