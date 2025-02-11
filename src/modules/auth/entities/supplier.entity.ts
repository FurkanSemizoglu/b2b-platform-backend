import { Supplier } from '@prisma/client';

export class SupplierEntity implements Supplier {
  id: string;
  companyName: string;
  website: string | null;
  logo: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
} 