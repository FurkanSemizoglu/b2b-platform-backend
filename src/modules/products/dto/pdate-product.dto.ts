export class UpdateProductDto {
    productName?: string; 
    productDescription?: string;
    totalStockQuantity?: number;
    unitPrice?: number;
    siloStockQuantity?: number;
    marketStockQuantity?: number;
    minimumSellingQuantity?: number;
    discountRate?: number;
    storeCostPerUnit?: number;
    categoryId?: string;
    supplierId?: string;
}