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
    // Eski refresh token'ları temizle
    await this.prisma.refreshToken.deleteMany({
      where: { userId: user.id }
    });

    // Yeni refresh token oluştur ve kaydet
    const refreshToken = this.generateRefreshToken(user);
    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 gün
      }
    });

    return {
      access_token: this.generateAccessToken(user),
      refresh_token: refreshToken
    };
  }

  private generateAccessToken(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id,
      role: user.role 
    };
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  private generateRefreshToken(user: any) {
    const payload = { 
      sub: user.id
    };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  async refresh(refreshToken: string) {
    const tokenRecord = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true }
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    return {
      access_token: this.generateAccessToken(tokenRecord.user)
    };
  }

  async logout(userId: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { userId }
    });
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