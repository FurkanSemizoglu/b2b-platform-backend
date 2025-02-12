import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { ShipmentEntity } from './entities/shipment.entity';

@Injectable()
export class ShipmentService {
  constructor(private prisma: PrismaService) {}

  async create(createShipmentDto: CreateShipmentDto) {
    return this.prisma.shipment.create({
      data: {
        ...createShipmentDto,
      },
    });
  }

  async findAll() {
    return this.prisma.shipment.findMany({
      include: {
        order: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.shipment.findUnique({
      where: { id },
      include: {
        order: true,
      },
    });
  }

  async update(id: string, updateData: any) {
    return this.prisma.shipment.update({
      where: { id },
      data: updateData,
      include: {
        order: true,
      },
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
                product: true,
              },
            },
          },
        },
      },
    });
  }
} 