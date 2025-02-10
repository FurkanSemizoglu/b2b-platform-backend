import { Product ,Prisma  ,Category ,Supplier ,Images } from '@prisma/client'; // Prisma Client'tan Product tipini içe aktar

export class ProductEntity implements Product { // Product interface'ini uygula
  id: string;
  productName: string;
  productDescription: string;
  isActive: boolean;
  putToMarket: boolean;
  availableForTrade: boolean;
  totalStockQuantity: number;
  unitPrice: Prisma.Decimal; // Decimal tipini kullan
  siloStockQuantity: number | null;
  marketStockQuantity: number | null;
  minimumSellingQuantity: number | null;
  discountAvailable: boolean;
  discountRate: number;
  Images: Images[];
  categoryId: string;
  category: Category;
  supplierId: string;
  supplier: Supplier;
  createdAt: Date;
  updatedAt: Date;
}