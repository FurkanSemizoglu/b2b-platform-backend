// filepath: /c:/Users/furka/vsProjects/b2b-platform-backend/src/modules/orders/orders.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { OrderEntity } from './entities/order.entity';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    // update güncellenicek update kısmında sıkıntılar var ve status için enum bilgisi gerekiyo buraları düzelt.

    @Get()
    async findAll(): Promise<OrderEntity[]> {
        return this.ordersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<OrderEntity> {
        return this.ordersService.findOne(id);
    }

    @Post()
    async create(@Body() createOrderDto : CreateOrderDto): Promise<OrderEntity> {
        return this.ordersService.create(createOrderDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateOrderDto :UpdateOrderDto): Promise<OrderEntity> {
        return this.ordersService.update(id, updateOrderDto);
    }

 /*    @Delete(':id')
    async remove(@Param('id') id: string): Promise<{ order: OrderEntity, message: string }> {
        return this.ordersService.remove(id);
    } */
}