import { Supplier } from '@prisma/client';
import { ProductEntity } from 'src/modules/products/entities/product.entity';

export class SupplierEntity implements Supplier {
  id: string;
  companyName: string;
  sellerName: string;
  sellerLastname: string;
  website: string | null;
  logo : string | null;
  email: string;
  password: string; // Burada parola hashlenmiş bir şekilde tutulucak.
  products: ProductEntity[]; 
  address :  null; // Şimdilik burası böyle burayaı merih değiştiricek.
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}