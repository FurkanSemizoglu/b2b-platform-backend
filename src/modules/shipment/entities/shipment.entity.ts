import { Shipment, StatusType } from '@prisma/client';
import { OrderEntity } from '../../order/entities/order.entity';
import { Decimal } from '@prisma/client/runtime/library';

export class ShipmentEntity implements Shipment {
  id: string;
  orderId: string;
  order?: OrderEntity;
  shipmentDate: Date | null;
  companyName: string;
  shipmentType: string;
  trackingNumber: string | null;
  shippingPrice: Decimal | null;
  status: StatusType;
  createdAt: Date;
  updatedAt: Date;
} 