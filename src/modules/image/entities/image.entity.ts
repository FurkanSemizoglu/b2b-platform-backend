import { Images } from '@prisma/client';
import { ProductEntity } from 'src/modules/products/entities/product.entity';

export class ImageEntity implements Images {
  id: string;
  url: string;
  productId: string;
  product : ProductEntity;
  createdAt: Date;
  updatedAt: Date;
}