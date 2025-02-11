import {  OrderEntity } from './order.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';

export class OrderItemEntity {
    id: string;
    orderId: string;
    order: OrderEntity;
    productId: string;
    product: ProductEntity;
    quantity: number;
    discountRate: number;
    unitPrice: number;
    createdAt: Date;
    updatedAt: Date;
}