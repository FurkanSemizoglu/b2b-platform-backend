import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { UpdateProductDto } from './dto/pdate-product.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AdminGuard } from '../../guards/admin.guard';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    //@UseGuards(JwtAuthGuard)
    @Get() // GET /products
    async findAll(): Promise<ProductEntity[]> {
      return this.productsService.findAll();
    }

    //@UseGuards(JwtAuthGuard)
    @Get(':id') // GET /products/:id
    async findOne(@Param('id') id: string): Promise<ProductEntity> {
      return this.productsService.getProductById(id);
    }
    
    //@UseGuards(JwtAuthGuard)
    @Get()
    async findAllByCategory(@Query('categoryId') categoryId: string): Promise<ProductEntity[]> {
        return this.productsService.getProductsByCategory(categoryId);
    }

    //@UseGuards(JwtAuthGuard,AdminGuard)
    @Post() // POST /products
    async create(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
      return this.productsService.create(createProductDto);
    }

    //@UseGuards(JwtAuthGuard,AdminGuard)
    @Put(':id') // PUT /products/:id
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<ProductEntity> {
      return this.productsService.update(id, updateProductDto);
    }
  
    //@UseGuards(JwtAuthGuard,AdminGuard)
    @Delete(':id') // DELETE /products/:id
    async remove(@Param('id') id: string): Promise<{ product: ProductEntity, message: string }> {
      return this.productsService.remove(id);
    }

}
