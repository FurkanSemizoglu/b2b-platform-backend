import { Module } from '@nestjs/common';
import { SpecialDiscountService } from './special-discount.service';
import { SpecialDiscountController } from './special-discount.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SpecialDiscountController],
  providers: [SpecialDiscountService],
  exports: [SpecialDiscountService],
})
export class SpecialDiscountModule {} 