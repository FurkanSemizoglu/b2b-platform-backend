import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductInvestmentDto } from './dto/create-product-investment.dto';
import { UpdateProductInvestmentDto } from './dto/update-product-investment.dto';

@Injectable()
export class ProductInvestmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductInvestmentDto: CreateProductInvestmentDto) {
    return this.prisma.productInvestment.create({
      data: {
        quantity: createProductInvestmentDto.quantity,
        unitPrice: createProductInvestmentDto.unitPrice,
        active: true,
        product: {
          connect: { id: createProductInvestmentDto.productID }
        },
        customer: {
          connect: { id: createProductInvestmentDto.customerID }
        },
        supplier: {
          connect: { id: createProductInvestmentDto.supplierID }
        },
        bill: {
          create: {
            billDate: new Date()
          }
        }
      },
      include: {
        product: true,
        customer: true,
        supplier: true,
        bill: true
      }
    });
  }

  async findAll() {
    return this.prisma.productInvestment.findMany({
      include: {
        product: true,
        customer: true,
        supplier: true,
        bill: true
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.productInvestment.findUnique({
      where: { id },
      include: {
        product: true,
        customer: true,
        supplier: true,
        bill: true
      }
    });
  }

  async update(id: string, updateProductInvestmentDto: UpdateProductInvestmentDto) {
    return this.prisma.productInvestment.update({
      where: { id },
      data: updateProductInvestmentDto,
      include: {
        product: true,
        customer: true,
        supplier: true,
        bill: true
      }
    });
  }

  async remove(id: string) {
    return this.prisma.productInvestment.delete({
      where: { id }
    });
  }

  async findByCustomer(customerId: string) {
    return this.prisma.productInvestment.findMany({
      where: { customerID: customerId },
      include: {
        product: true,
        customer: true,
        supplier: true,
        bill: true
      }
    });
  }

  async findBySupplier(supplierId: string) {
    return this.prisma.productInvestment.findMany({
      where: { supplierID: supplierId },
      include: {
        product: true,
        customer: true,
        supplier: true,
        bill: true
      }
    });
  }
}
