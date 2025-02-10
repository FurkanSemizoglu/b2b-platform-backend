import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {

    constructor(private readonly prisma: PrismaService) {}

    async getAllProducts() {
        return this.prisma.product.findMany(); 
    }
}
