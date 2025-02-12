import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async getSuppliers() {
    return this.prisma.supplier.findMany({
      include: { user: true },
    });
  }

  async getCustomers() {
    return this.prisma.customer.findMany({
      include: { user: true },
    });
  }

  async createSupplier(createSupplierDto: CreateSupplierDto) {
    const user = await this.prisma.user.create({
      data: {
        name: createSupplierDto.name,
        surname: createSupplierDto.surname,
        email: createSupplierDto.email,
        password: createSupplierDto.password,
        age: createSupplierDto.age,
        role: 'SUPPLIER', // veya UserRole enum'ını kullanabilirsiniz
      },
    });

    return this.prisma.supplier.create({
      data: {
        userId: user.id, // Yeni oluşturulan kullanıcının ID'si
        companyName: createSupplierDto.companyName,
        website: createSupplierDto.website,
        logo: createSupplierDto.logo,
      },
    });
  }

  async deleteSupplier(id: string) {
    return this.prisma.supplier.delete({
      where: { id },
    });
  }

  async updateSupplier(id: string, updateData: any) {
    return this.prisma.supplier.update({
      where: { id },
      data: updateData,
    });
  }

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    const user = await this.prisma.user.create({
      data: {
        name: createCustomerDto.name,
        surname: createCustomerDto.surname,
        email: createCustomerDto.email,
        password: createCustomerDto.password,
        age: createCustomerDto.age,
        role: 'CUSTOMER', // or use UserRole enum
      },
    });

    return await this.prisma.customer.create({
      data: {
        userId: user.id, // Use connect instead of setting userId directly
      },
    });
  }

  async deleteCustomer(id: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }

  async updateCustomer(id: string, updateData: any) {
    return this.prisma.customer.update({
      where: { id },
      data: updateData,
    });
  }
} 