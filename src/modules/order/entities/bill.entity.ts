import { Bill } from "@prisma/client";

export class BillEntity implements Bill {
    id: string;
    orderId: string;
    billDate : Date;
    createdAt: Date;
    updatedAt: Date;
}