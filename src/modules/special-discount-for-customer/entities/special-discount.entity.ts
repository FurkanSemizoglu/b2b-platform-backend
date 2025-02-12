import { SpecialDiscountForCustomer } from '@prisma/client';

export class SpecialDiscount implements SpecialDiscountForCustomer {
  id: string;
  productID: string;
  customerID: string;
  supplierID: string;
  discountRate: number;
  active: boolean;
  createdTime: Date;
  updatedTime: Date;
} 