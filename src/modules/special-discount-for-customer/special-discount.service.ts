import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSpecialDiscountDto } from './dto/create-special-discount.dto';
import { UpdateSpecialDiscountDto } from './dto/update-special-discount.dto';

@Injectable()
export class SpecialDiscountService {
  constructor(private prisma: PrismaService) {}

  create(createSpecialDiscountDto: CreateSpecialDiscountDto) {
    return this.prisma.specialDiscountForCustomer.create({
      data: {
        ...createSpecialDiscountDto,
      },
    });
  }

  findAll() {
    return this.prisma.specialDiscountForCustomer.findMany({
     /*  where: {
        active: true,
      }, */
      include: {
        product: true,
        customer: true,
        supplier: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.specialDiscountForCustomer.findUnique({
      where: { id },
      include: {
        product: true,
        customer: true,
        supplier: true,
      },
    });
  }

  update(id: string, updateSpecialDiscountDto: UpdateSpecialDiscountDto) {
    return this.prisma.specialDiscountForCustomer.update({
      where: { id },
      data: updateSpecialDiscountDto,
    });
  }

  remove(id: string) {
    return this.prisma.specialDiscountForCustomer.update({
      where: { id },
      data: { active: false },
    });
  }
} 