import { Module } from '@nestjs/common';
import { SpecialDiscountService } from './special-discount.service';
import { SpecialDiscountController } from './special-discount.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [SpecialDiscountController],
  providers: [SpecialDiscountService],
  exports: [SpecialDiscountService],
})
export class SpecialDiscountModule {} 