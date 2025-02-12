import { Order, StatusType, Supplier } from '@prisma/client';
import { BillEntity } from './bill.entity';
import { OrderItemEntity } from './order-item.entity';

import { SupplierEntity } from 'src/modules/supplier/entities/supplier.entity';
import { CustomerEntity } from 'src/modules/customer/entities/customer.entity';

import { Decimal } from '@prisma/client/runtime/library';
import { ShipmentEntity } from 'src/modules/shipment/entities/shipment.entity';

export class OrderEntity implements Order {
    id: string;
    orderNumber: string;
    customerId: string ;
    customer : CustomerEntity;
    supplierId: string;
    supplier : SupplierEntity;
    status: StatusType;
    orderItems: OrderItemEntity[];
    shipment?: ShipmentEntity;
    paymentDate: Date | null;
    supplierApproval: boolean | null;
    totalCost: Decimal | null;
    billId: string | null;
    bill?: BillEntity ;
    createdAt: Date;
    updatedAt: Date;
}