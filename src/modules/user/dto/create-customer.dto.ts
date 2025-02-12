import { IsString, IsEmail, IsOptional, IsInt, Min, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  name: string; 

  @IsString()
  surname: string; // soyadı

  @IsEmail()
  email: string; // e-posta adresi

  @IsString()
  @MinLength(6)
  password: string; // şifresi

  @IsInt()
  @Min(18)
  age: number; // yaşı

} 