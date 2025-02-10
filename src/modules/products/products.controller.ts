import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { UpdateProductDto } from './dto/pdate-product.dto';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Get() // GET /products
    async findAll(): Promise<ProductEntity[]> {
      return this.productsService.findAll();
    }

    @Get(':id') // GET /products/:id
    async findOne(@Param('id') id: string): Promise<ProductEntity> {
      return this.productsService.getProductById(id);
    }
    
    @Get()
    async findAllByCategory(@Query('categoryId') categoryId: string): Promise<ProductEntity[]> {
        return this.productsService.getProductsByCategory(categoryId);
    }

    @Post() // POST /products
    async create(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
      return this.productsService.create(createProductDto);
    }

    @Put(':id') // PUT /products/:id
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<ProductEntity> {
      return this.productsService.update(id, updateProductDto);
    }
  
    @Delete(':id') // DELETE /products/:id
    async remove(@Param('id') id: string): Promise<void> {
      return this.productsService.remove(id);
    }

}
