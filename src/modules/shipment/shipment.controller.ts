import { Controller, Get, Post, Body, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { StatusType } from '@prisma/client';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AdminGuard } from '../../guards/admin.guard';

@Controller('shipments')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}
  //kargo takibi
  // teslimat onayı
  // kargo iptali
  // tahmini teslimat zamanı
  // kargo ücreti hesaplama
  // EKLENEBİLİR

  @Post() // supplier için
  create(@Body() createShipmentDto: CreateShipmentDto) {
    return this.shipmentService.create(createShipmentDto);
  }

  //@UseGuards(JwtAuthGuard,AdminGuard)
  @Get() // admin paneli için
  findAll() {
    return this.shipmentService.findAll();
  }

  //@UseGuards(JwtAuthGuard,AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentService.findOne(id);
  }

  @Put(':id') // burası supplier için
  update(@Param('id') id: string, @Body() updateData: UpdateShipmentDto) {
    return this.shipmentService.update(id, updateData);
  }

  //@UseGuards(JwtAuthGuard,AdminGuard)
  @Get(':id/items') // items listesi döndürür direkt
  findShipmentItems(@Param('id') id: string) {
    return this.shipmentService.findShipmentItems(id);
  }

} 