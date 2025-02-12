import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { StatusType } from '@prisma/client';

@Injectable()
export class ShipmentService {
  constructor(private prisma: PrismaService) {}

  create(createShipmentDto: CreateShipmentDto) {
    return this.prisma.shipment.create({
      data: createShipmentDto,
      include: {
        order: true,
        shipper: true
      }
    });
  }

  findAll() {
    return this.prisma.shipment.findMany({
      include: {
        order: true,
        shipper: true
      }
    });
  }

  findOne(id: string) {
    return this.prisma.shipment.findUnique({
      where: { id },
      include: {
        order: true,
        shipper: true
      }
    });
  }

  update(id: string, updateData: any) {
    return this.prisma.shipment.update({
      where: { id },
      data: updateData,
      include: {
        order: true,
        shipper: true
      }
    });
  }



  async findShipmentItems(id: string) {
    return this.prisma.shipment.findUnique({
      where: { id },
      include: {
        order: {
          include: {
            orderItems: {
              include: {
                product: true
              }
            }
          }
        }
      }
    });
  }

} 