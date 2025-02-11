export class CreateSupplierDto {
    companyName: string;
    website?: string;
    logo?: string;
    address?: string;
    userId: string;
    // address: CreateAddressDto; // Address DTO'sunu buraya ekleyebilirsiniz 
}