import { Shipment, StatusType } from '@prisma/client';
import { OrderEntity } from '../../order/entities/order.entity';
import { ShipperEntity } from './shipper.entity';
import { Decimal } from '@prisma/client/runtime/library';

export class ShipmentEntity implements Shipment {
  id: string;
  orderId: string;
  order?: OrderEntity;
  shipmentDate: Date | null;
  shipperId: string;
  shipper?: ShipperEntity;
  trackingNumber: string | null;
  shippingPrice: Decimal | null;
  status: StatusType;
  createdAt: Date;
  updatedAt: Date;
} 