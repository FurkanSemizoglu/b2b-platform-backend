import { StatusType, Supplier } from '@prisma/client';
import { BillEntity } from './bill.entity';
import { OrderItemEntity } from './order-item.entity';
import { ShipmentEntity } from './shipment.entity';
import { CustomerEntity } from '../../customer/entities/customer.entity';
import { SupplierEntity } from 'src/modules/supplier/entities/supplier.entity';



export class OrderEntity {
    id: string;
    orderNumber: string;
    customerId: string;
    customer : CustomerEntity;
    supplierId: string;
    supplier : SupplierEntity;
    status: StatusType;
    orderItems: OrderItemEntity[];
    shipment?: ShipmentEntity;
    paymentDate?: Date;
    supplierApproval?: boolean;
    totalCost?: number;
    bill?: BillEntity;
    createdAt: Date;
    updatedAt: Date;
}