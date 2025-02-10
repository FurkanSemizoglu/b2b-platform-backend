import { Controller } from '@nestjs/common';
import { CategoriesService } from './category.service';

@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService : CategoriesService){}




}
