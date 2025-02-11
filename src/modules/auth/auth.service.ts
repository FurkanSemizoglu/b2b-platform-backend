import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ 
      where: { email } 
    });

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
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

  async register(data: {
    name: string;
    surname: string;
    email: string;
    password: string;
    age: number;
    role: UserRole;
    companyName?: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Email kontrolü
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    return this.prisma.$transaction(async (prisma) => {
      // User oluştur
      const user = await prisma.user.create({
        data: {
          name: data.name,
          surname: data.surname,
          email: data.email,
          password: hashedPassword,
          age: data.age,
          role: data.role
        }
      });

      // Role'e göre kayıt oluştur
      switch (data.role) {
        case UserRole.SUPPLIER:
          if (!data.companyName) {
            throw new BadRequestException('Company name is required for suppliers');
          }
          return await prisma.supplier.create({
            data: {
              companyName: data.companyName,
              userId: user.id
            },
            include: { user: true }
          });

        case UserRole.CUSTOMER:
          return await prisma.customer.create({
            data: { userId: user.id },
            include: { user: true }
          });

        case UserRole.ADMIN:
          return await prisma.admin.create({
            data: { userId: user.id },
            include: { user: true }
          });

        default:
          throw new BadRequestException('Invalid role');
      }
    });
  }
} 