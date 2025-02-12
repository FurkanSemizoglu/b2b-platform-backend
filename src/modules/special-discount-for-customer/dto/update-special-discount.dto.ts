import { IsString } from "class-validator";

import { IsNumber, IsOptional } from "class-validator";

import { IsBoolean } from "class-validator";

export class UpdateSpecialDiscountDto {
    @IsOptional()
    @IsString()
    productID?: string;
  
    @IsOptional()
    @IsString()
    customerID?: string;
  
    @IsOptional()
    @IsString()
    supplierID?: string;
  
    @IsOptional()
    @IsNumber()
    discountRate?: number;
  
    @IsOptional()
    @IsBoolean()
    active?: boolean;
  } 