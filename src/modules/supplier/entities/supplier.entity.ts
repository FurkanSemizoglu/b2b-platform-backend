import { Supplier } from '@prisma/client';
import { ProductEntity } from 'src/modules/products/entities/product.entity';

export class SupplierEntity implements Supplier {
  id: string;
  companyName: string;
  website: string | null;
  logo : string | null;
  products: ProductEntity[]; 
  address :  null; // Şimdilik burası böyle burayaı merih değiştiricek.
  createdAt: Date;
  updatedAt: Date;
  userId: string;

}