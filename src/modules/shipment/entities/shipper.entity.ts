import { Shipper } from '@prisma/client';
import { ShipmentEntity } from './shipment.entity';

export class ShipperEntity implements Shipper {
  id: string;
  componyName: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  shipments?: ShipmentEntity[];
  ShipmentType: string;
  createdAt: Date;
  updatedAt: Date;
} 