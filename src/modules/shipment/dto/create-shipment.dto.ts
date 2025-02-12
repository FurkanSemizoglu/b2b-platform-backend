import { IsString, IsOptional, IsDecimal, IsDate } from 'class-validator';

export class CreateShipmentDto {
  @IsString()
  orderId: string;

  @IsString()
  companyName: string;

  @IsString()
  shipmentType: string;

  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @IsOptional()
  @IsDecimal()
  shippingPrice?: number;

  @IsOptional()
  @IsDate()
  shipmentDate?: Date;
} 