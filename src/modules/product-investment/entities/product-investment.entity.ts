import { Decimal } from '@prisma/client/runtime/library';

export class ProductInvestment implements ProductInvestment {
  id: string;
  
  productID: string;
  product?: any; // Product relation
  
  quantity: number;
  unitPrice: Decimal;
  
  customerID: string;
  customer?: any; // Customer relation
  
  supplierID: string;
  supplier?: any; // Supplier relation
  
  billID: string;
  bill?: any; // Bill relation
  
  active: boolean;
} 