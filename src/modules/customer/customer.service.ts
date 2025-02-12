import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.customer.findMany({
      include: { user: true }
    });
  }

  async findOne(id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
      include: { user: true }
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