import { IsString, IsEmail, IsOptional, IsInt, Min, MinLength } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  name: string; // Tedarikçi adı

  @IsString()
  surname: string; // Tedarikçi soyadı

  @IsEmail()
  email: string; // Tedarikçi e-posta adresi

  @IsString()
  @MinLength(6)
  password: string; // Tedarikçi şifresi

  @IsInt()
  @Min(18)
  age: number; // Tedarikçi yaşı

  @IsString()
  companyName: string; // Şirket adı

  @IsOptional()
  @IsString()
  website?: string; // Web sitesi (opsiyonel)

  @IsOptional()
  @IsString()
  logo?: string; // Logo URL'si (opsiyonel)
} 