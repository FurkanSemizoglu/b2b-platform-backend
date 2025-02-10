export class UpdateSupplierDto {
    companyName?: string;
    sellerName?: string;
    sellerLastname?: string;
    website?: string;
    logo?: string;
    email?: string;
    password?: string; // Şimdilik burada kalsın, serviste hash'lenecek
    // address: UpdateAddressDto; // Address DTO'sunu buraya ekleyebilirsiniz (isteğe bağlı)
  }