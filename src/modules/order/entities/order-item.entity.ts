import { OrderItem } from '@prisma/client';
import {  OrderEntity } from './order.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { Decimal } from '@prisma/client/runtime/library';
export class OrderItemEntity implements OrderItem {
    id: string;
    orderId: string;
    order: OrderEntity;
    productId: string;
    product: ProductEntity;
    quantity: number;
    discountRate: number;
    unitPrice: Decimal;
    createdAt: Date;
    updatedAt: Date;
}