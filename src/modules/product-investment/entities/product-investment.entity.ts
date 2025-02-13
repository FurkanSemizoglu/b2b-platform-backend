import { Decimal } from '@prisma/client/runtime/library';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { CustomerEntity } from 'src/modules/customer/entities/customer.entity';
import { SupplierEntity } from 'src/modules/supplier/entities/supplier.entity';
import { BillEntity } from 'src/modules/order/entities/bill.entity';

export class ProductInvestment {
  id: string;
  
  productID: string;
  product?: ProductEntity; // Product ile ilişki
  
  quantity: number;
  unitPrice: Decimal;
  
  customerID: string;
  customer?: CustomerEntity; // Customer ile ilişki
  
  supplierID: string;
  supplier?: SupplierEntity; // Supplier ile ilişki
  
  billID?: string;
  bill?: BillEntity; // Bill ile opsiyonel ilişki
  
  active: boolean;
  createdTime: Date;
  endingTime?: Date;
}
