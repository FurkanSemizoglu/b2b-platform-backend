import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateProductInvestmentDto {
  @IsNotEmpty() 
  @IsUUID()
  productID: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  unitPrice: number;

  @IsNotEmpty()
  @IsUUID()
  customerID: string;

  @IsNotEmpty()
  @IsUUID()
  supplierID: string;
} 