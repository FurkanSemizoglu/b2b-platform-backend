import { Module } from '@nestjs/common';
import { ProductInvestmentService } from './product-investment.service';
import { ProductInvestmentController } from './product-investment.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductInvestmentController],
  providers: [ProductInvestmentService],
  exports: [ProductInvestmentService]
})
export class ProductInvestmentModule {}
