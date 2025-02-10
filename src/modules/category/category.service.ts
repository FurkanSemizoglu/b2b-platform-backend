import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryEntity } from './entities/category.entity'; // Import CategoryEntity
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.prisma.category.findMany();
    return categories.map((category) => this.mapCategoryToEntity(category));
  }

  async findOne(id: string): Promise<CategoryEntity | null> {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      return null;
    }
    return this.mapCategoryToEntity(category);
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const category = await this.prisma.category.create({ data: createCategoryDto });
    return this.mapCategoryToEntity(category);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    const category = await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
    return this.mapCategoryToEntity(category);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }

  private mapCategoryToEntity(category: any): CategoryEntity {
    const categoryEntity = new CategoryEntity();
    Object.assign(categoryEntity, category);
    return categoryEntity;
  }
}