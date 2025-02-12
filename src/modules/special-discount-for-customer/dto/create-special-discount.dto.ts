import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSpecialDiscountDto {
  @IsString()
  productID: string;

  @IsString()
  customerID: string;

  @IsString()
  supplierID: string;

  @IsNumber()
  discountRate: number;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
} 