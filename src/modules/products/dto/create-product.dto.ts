export class CreateProductDto {
    productName: string;
    productDescription: string;
    totalStockQuantity: number;
    unitPrice: number;
    siloStockQuantity: number;
    marketStockQuantity: number;
    minimumSellingQuantity: number;
    discountRate: number;
    categoryId: string;
    supplierId: string;
} 