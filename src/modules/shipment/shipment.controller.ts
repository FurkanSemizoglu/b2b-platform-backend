import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { StatusType } from '@prisma/client';

@Controller('shipments')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}
// SHIPPER EKLENMESI NASIL OLACAK? BIZ MI EKLICEZ?
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

  @Get() // admin paneli için
  findAll() {
    return this.shipmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentService.findOne(id);
  }

  @Put(':id') // burası supplier için
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.shipmentService.update(id, updateData);
  }



  @Get(':id/items') 
  findShipmentItems(@Param('id') id: string) {
    return this.shipmentService.findShipmentItems(id);
  }

} 