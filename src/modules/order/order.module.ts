import { Module } from '@nestjs/common';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
   imports: [PrismaModule],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrderModule {}
