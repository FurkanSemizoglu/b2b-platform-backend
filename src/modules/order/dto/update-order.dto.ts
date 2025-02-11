import { IsString, IsDate, IsOptional, IsArray, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateOrderItemDto {
    @IsOptional()
    @IsString()
    productId?: string;

    @IsOptional()
    @IsNumber()
    quantity?: number;

    @IsOptional()
    @IsNumber()
    discountRate?: number;

    @IsOptional()
    @IsNumber()
    unitPrice?: number;
}

class UpdateShipmentDto {
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    shipmentDate?: Date;

    @IsOptional()
    @IsString()
    shipperId?: string;

    @IsOptional()
    @IsString()
    trackingNumber?: string;

    @IsOptional()
    @IsNumber()
    shippingPrice?: number;

}

class UpdateBillDto {
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    billDate?: Date;
}

export class UpdateOrderDto {

    @IsOptional()
    @IsBoolean()
    supplierApproval?: boolean;


    @IsOptional()
    @Type(() => UpdateBillDto)
    bill?: UpdateBillDto;
}