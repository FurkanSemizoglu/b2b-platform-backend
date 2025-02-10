import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { UpdateProductDto } from './dto/pdate-product.dto';

@Injectable()
export class ProductsService {

    constructor(private readonly prisma: PrismaService) { }




    async findAll(): Promise<ProductEntity[]> {
        const products = await this.prisma.product.findMany({
            include: {
                images: true,
                category: true,
                supplier: true,
            }
        });

        return products.map((product) => this.mapProductToEntity(product));
    }


    async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
        const product = await this.prisma.product.create({
            data: createProductDto,
        });

        return this.mapProductToEntity(product);
    }


    async getProductById(id: string): Promise<ProductEntity> {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                images: true,
                category: true,
                supplier: true,
            }
        });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return this.mapProductToEntity(product);
    }


    async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
        const product = await this.prisma.product.update({
            where: { id },
            data: updateProductDto,
            include: {
                images: true,
                category: true,
                supplier: true,
            },
        });

        return this.mapProductToEntity(product);
    }

    async remove(id: string): Promise<void> {
        const product = await this.prisma.product.delete({
            where: { id },
            include: { // Silinecek ürünü al (isteğe bağlı)
                images: true,
                category: true,
                supplier: true,
            },
        });

        // burada mesaj iletebiliriz ya da silinen veriyi gösterebiliriz belki
        // Silme işleminden önce veya sonra ek işlemler yapabilirsiniz (isteğe bağlı)
    }

    async getProductsByCategory(categoryId: string): Promise<ProductEntity[]> {
        const products = await this.prisma.product.findMany({
          where: { categoryId },
          include: {
            images: true,
            category: true,
            supplier: true,
          },
        });
    
        return products.map((product) => this.mapProductToEntity(product));
    }

    private mapProductToEntity(product: any): ProductEntity {
        const productEntity = new ProductEntity();
        Object.assign(productEntity, product);
        return productEntity;
    }

}
