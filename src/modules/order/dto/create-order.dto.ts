import { IsString, IsDate, IsOptional, IsArray, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

class CreateOrderItemDto {
    @IsString()
    productId: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    discountRate: number;

    @IsNumber()
    unitPrice: number;
}

class CreateShipmentDto {
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    shipmentDate?: Date;

    @IsString()
    shipperId: string;

    @IsOptional()
    @IsString()
    trackingNumber?: string;

    @IsOptional()
    @IsNumber()
    shippingPrice?: number;

    @IsString()
    status: string;
}

class CreateBillDto {
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    billDate?: Date;
}

export class CreateOrderDto {
    @IsString()
    orderNumber: string;

    @IsString()
    customerId: string;

    @IsString()
    supplierId: string;
   

    @IsArray()
    @Type(() => CreateOrderItemDto)
    orderItems: CreateOrderItemDto[];

    @IsOptional()
    @Type(() => CreateShipmentDto)
    shipment?: CreateShipmentDto;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    paymentDate?: Date;

    @IsOptional()
    @IsBoolean()
    supplierApproval?: boolean;

    @IsOptional()
    @IsNumber()
    totalCost?: number;

    @IsOptional()
    @Type(() => CreateBillDto)
    bill?: CreateBillDto;
}