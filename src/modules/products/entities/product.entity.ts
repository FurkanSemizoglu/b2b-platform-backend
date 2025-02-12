import { Product, Prisma } from '@prisma/client';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { ImageEntity } from 'src/modules/image/entities/image.entity';
import { SupplierEntity } from 'src/modules/supplier/entities/supplier.entity';


export class ProductEntity implements Product {
  id: string;
  productName: string;
  productDescription: string;
  isActive: boolean;
  putToMarket: boolean;
  availableForTrade: boolean;
  totalStockQuantity: number;
  unitPrice: Prisma.Decimal;
  siloStockQuantity: number | null;
  marketStockQuantity: number | null;
  minimumSellingQuantity: number | null;
  discountAvailable: boolean;
  discountRate: number;
  images: ImageEntity[] | null; 
  storageCostPerUnit : Prisma.Decimal | null;
  categoryId: string;
  category: CategoryEntity  | null; 
  supplierId: string;
  supplier: SupplierEntity | null; 
  createdAt: Date;
  updatedAt: Date;
}