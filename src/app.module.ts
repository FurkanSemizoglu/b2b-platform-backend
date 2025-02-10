import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoryModule } from './modules/category/category.module';
import { ImageModule } from './modules/image/image.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PrismaModule, ProductsModule, CategoryModule, ImageModule, SupplierModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
