import { Module } from '@nestjs/common';
import { CategoriesService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  providers: [CategoriesService],
  controllers: [CategoryController]
})
export class CategoryModule {}
