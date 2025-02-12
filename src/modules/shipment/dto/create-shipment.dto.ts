import { IsString, IsOptional, IsDate, IsDecimal } from 'class-validator';

export class CreateShipmentDto {
  @IsString()
  orderId: string;

  @IsString()
  shipperId: string;

  @IsOptional()
  @IsDate()
  shipmentDate?: Date;

  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @IsOptional()
  @IsDecimal()
  shippingPrice?: number;
} 