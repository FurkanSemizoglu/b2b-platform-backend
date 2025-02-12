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
  shippingPrice?: number;

  @IsOptional()
  shipmentDate?: Date;
} 