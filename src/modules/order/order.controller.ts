// filepath: /c:/Users/furka/vsProjects/b2b-platform-backend/src/modules/orders/orders.controller.ts
import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AdminGuard } from '../../guards/admin.guard';

import { OrderEntity } from './entities/order.entity';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    // update güncellenicek update kısmında sıkıntılar var ve status için enum bilgisi gerekiyo buraları düzelt.

    //@UseGuards(JwtAuthGuard,AdminGuard)
    @Get()
    async findAll(): Promise<OrderEntity[]> {
        return this.ordersService.findAll();
    }

    //@UseGuards(JwtAuthGuard,AdminGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<OrderEntity> {
        return this.ordersService.findOne(id);
    }

    //@UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createOrderDto : CreateOrderDto): Promise<OrderEntity> {
        return this.ordersService.create(createOrderDto);
    }

    //@UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateOrderDto :UpdateOrderDto): Promise<OrderEntity> {
        return this.ordersService.update(id, updateOrderDto);
    }

    //@UseGuards(JwtAuthGuard)
    @Get('supplier/:supplierId')
    async getOrdersBySupplier(@Param('supplierId') supplierId: string): Promise<OrderEntity[]> {
        return this.ordersService.getOrdersBySeller(supplierId);
    }

    //@UseGuards(JwtAuthGuard)
    @Put('supplier/:sellerId/order/:orderId')
    async updateOrderBySeller(
        @Param('supplierId') supplierId: string,
        @Param('orderId') orderId: string,
        @Body() updateOrderDto: UpdateOrderDto
    ): Promise<OrderEntity> {
        return this.ordersService.updateOrderBySeller(supplierId, orderId, updateOrderDto);
    }
    

 /*    @Delete(':id')
    async remove(@Param('id') id: string): Promise<{ order: OrderEntity, message: string }> {
        return this.ordersService.remove(id);
    } */
}