import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    try {
      const category = await this.prisma.category.create({ data: createCategoryDto });
      return this.mapCategoryToEntity(category);
    } catch (error) {
      throw new HttpException('Kategori oluşturulurken bir hata oluştu', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
    const category = await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
    return this.mapCategoryToEntity(category);
  }

  async remove(id: string): Promise<string> {
    try {
      await this.prisma.category.delete({ where: { id } });
      return 'Kategori başarıyla silindi';
    } catch (error) {
      throw new HttpException('Kategori silinirken bir hata oluştu', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private mapCategoryToEntity(category: any): CategoryEntity {
    const categoryEntity = new CategoryEntity();
    Object.assign(categoryEntity, category);
    return categoryEntity;
  }
}