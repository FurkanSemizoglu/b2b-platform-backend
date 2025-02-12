import { User, UserRole } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  age: number;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
} 