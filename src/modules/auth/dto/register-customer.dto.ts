import { IsEmail, IsString, MinLength, IsInt, Min } from 'class-validator';

export class RegisterCustomerDto {
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
} 