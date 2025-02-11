import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    NotFoundException,
    UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../../guards/admin.guard';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CategoryService } from './category.service';


@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    async findAll(): Promise<CategoryEntity[]> {
        return this.categoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<CategoryEntity | null> {
        const category = await this.categoryService.findOne(id);
        if (!category) {
            throw new NotFoundException('Kategori bulunamadı');
        }
        return category;
    }

    @Post()
    @UseGuards(AdminGuard)
    async create(@Body() createCategoryDto: CreateCategoryDto,): Promise<CategoryEntity> {
        return this.categoryService.create(createCategoryDto);
    }

    @Put(':id')
    @UseGuards(AdminGuard)
    async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto,): Promise<CategoryEntity> {
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    async remove(@Param('id') id: string): Promise<void> {
        return this.categoryService.remove(id);
    }
}