import { Customer } from '@prisma/client';

export class CustomerEntity implements Customer {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
} 