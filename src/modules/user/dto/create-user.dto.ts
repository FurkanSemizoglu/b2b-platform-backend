import { IsString, IsEmail, IsInt, Min, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client'; // UserRole enum'ını içe aktarın

export class CreateUserDto {
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

  @IsEnum(UserRole) // UserRole enum'ını kullanın
  role: UserRole; // UserRole enum'ı kullanılabilir
} 
