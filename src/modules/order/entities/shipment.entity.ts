import {  OrderEntity } from './order.entity';
import { StatusType } from '@prisma/client';
import { ShipperEntity } from './shipper.entity';

export class ShipmentEntity {
    id: string;
    orderId: string;
    order: OrderEntity;
    shipmentDate?: Date;
    shipperId: string;
    shipper: ShipperEntity;
    trackingNumber?: string;
    shippingPrice?: number;
    status: StatusType;
    createdAt: Date;
    updatedAt: Date;
}