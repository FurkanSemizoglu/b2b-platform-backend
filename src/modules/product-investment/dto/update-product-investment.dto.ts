import { IsBoolean, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class UpdateProductInvestmentDto {
  @IsOptional()
  @IsUUID()
  productID?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  unitPrice?: number;

  @IsOptional()
  @IsUUID()
  customerID?: string;

  @IsOptional()
  @IsUUID()
  supplierID?: string;

  @IsOptional()
  @IsUUID()
  billID?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
} 