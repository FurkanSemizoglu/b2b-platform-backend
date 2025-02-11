import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../../prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupplierModule } from '../supplier/supplier.module';
import { CustomerModule } from '../customer/customer.module';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    SupplierModule,
    CustomerModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { 
          expiresIn: configService.get('JWT_EXPIRES_IN') 
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard
  ],
  exports: [AuthService, JwtAuthGuard]
})
export class AuthModule {} 