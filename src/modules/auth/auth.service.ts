import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        supplier: true,
        customer: true
      }
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id,
      role: user.role 
    };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async registerSupplier(data: {
    name: string;
    surname: string;
    email: string;
    password: string;
    age: number;
    companyName: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          name: data.name,
          surname: data.surname,
          email: data.email,
          password: hashedPassword,
          age: data.age,
          role: 'SUPPLIER'
        }
      });

      const supplier = await prisma.supplier.create({
        data: {
          companyName: data.companyName,
          userId: user.id
        },
        include: {
          user: true
        }
      });

      return supplier;
    });
  }

  async registerCustomer(data: {
    name: string;
    surname: string;
    email: string;
    password: string;
    age: number;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          name: data.name,
          surname: data.surname,
          email: data.email,
          password: hashedPassword,
          age: data.age,
          role: 'CUSTOMER'
        }
      });

      const customer = await prisma.customer.create({
        data: {
          userId: user.id
        },
        include: {
          user: true
        }
      });

      return customer;
    });
  }
} 