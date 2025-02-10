export class CreateSupplierDto {
    companyName: string;
    sellerName: string;
    sellerLastname: string;
    website?: string;
    logo?: string;
    email: string;
    password: string; // Şimdilik burada kalsın, serviste hash'lenecek
    // address: CreateAddressDto; // Address DTO'sunu buraya ekleyebilirsiniz 
}