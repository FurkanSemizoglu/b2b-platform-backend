import { ShipmentEntity } from "./shipment.entity";


export class ShipperEntity {
    id: string;
    companyName: string;
    phone?: string;
    email?: string;
    website?: string;
    shipments: ShipmentEntity[];
    shipmentType: string; // This could be an enum in the future
    createdAt: Date;
}