import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<OrderEntity[]> {
    const orders = await this.prisma.order.findMany({
      include: {
        orderItems: true,
        shipment: true,
        bill: true,
        supplier: true,
        customer: true
      },
    });
    return orders.map((order) => this.mapOrderToEntity(order));
  }

  async findOne(id: string): Promise<OrderEntity> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: true,
        shipment: true,
        bill: true,
        supplier: true,
        customer: true,
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return this.mapOrderToEntity(order);
  }

  async create(data: CreateOrderDto) {
    const order = this.prisma.order.create({
      data: {
        orderNumber: data.orderNumber,
        customerId: data.customerId,
        supplierId: data.supplierId,
        orderItems: {
          create: data.orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            discountRate: item.discountRate,
            unitPrice: item.unitPrice,
          })),
        },
        shipment: data.shipment
          ? {
              create: {
                shipmentDate: data.shipment.shipmentDate,
                shipperId: data.shipment.shipperId,
                trackingNumber: data.shipment.trackingNumber,
                shippingPrice: data.shipment.shippingPrice
              },
            }
          : undefined,
        paymentDate: data.paymentDate,
        supplierApproval: data.supplierApproval,
        totalCost: data.totalCost,
        bill: data.bill
          ? {
              create: {
                billDate: data.bill.billDate,
              },
            }
          : undefined,
      },
      include: {
        orderItems: true,
        shipment: true,
        bill: true,
        supplier: true,
        customer: true
      },
    });


    return this.mapOrderToEntity(order);
  }

  /* async create(data: any): Promise<OrderEntity> {
        const order = await this.prisma.order.create({
            data: {
                orderNumber: data.orderNumber,
                customerId: data.customerId,
                supplierId: data.supplierId,
                status: data.status,
                orderItems: {
                    create: data.orderItems.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        discountRate: item.discountRate,
                        unitPrice: item.unitPrice,
                    })),
                },
                shipment: {
                    create: {
                        shipmentDate: data.shipment.shipmentDate,
                        shipperId: data.shipment.shipperId,
                        trackingNumber: data.shipment.trackingNumber,
                        shippingPrice: data.shipment.shippingPrice,
                        status: data.shipment.status,
                    },
                },
                paymentDate: data.paymentDate,
                supplierApproval: data.supplierApproval,
                totalCost: data.totalCost,
                bill: {
                    create: {
                        billDate: data.bill.billDate,
                    },
                },
            },
            include: {
                orderItems: true,
                shipment: true,
                bill: true,
            },
        });
        return this.mapOrderToEntity(order);
    } */

  async update(id: string, data: any): Promise<OrderEntity> {
    const order = await this.prisma.order.update({
      where: { id },
      data,
      include: {
        orderItems: true,
        shipment: true,
        bill: true,
        supplier: true,
        customer: true
      },
    });
    return this.mapOrderToEntity(order);
  }

/*   async remove(id: string): Promise<{ order: OrderEntity; message: string }> {
    try {
      const order = await this.prisma.order.delete({
        where: { id }
      });
      return {
        order: this.mapOrderToEntity(order),
        message: 'Order successfully deleted',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete order with ID ${error}`,
      );
    }
  }
 */
  private mapOrderToEntity(order: any): OrderEntity {
    const orderEntity = new OrderEntity();
    Object.assign(orderEntity, order);
    return orderEntity;
  }
}
