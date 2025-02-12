export class CreateProductDto {
    productName: string;
    productDescription: string;
    totalStockQuantity: number;
    unitPrice: number;
    siloStockQuantity?: number;
    marketStockQuantity?: number;
    minimumSellingQuantity?: number;
    storeCostPerUnit?: number;
    discountRate: number;
    commissionRate: number;
    categoryId: string;
    supplierId: string;
} 