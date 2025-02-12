import { StatusType } from '@prisma/client';

export class UpdateShipmentDto {
    status?: StatusType;
  }