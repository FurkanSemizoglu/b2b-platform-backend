/*
  Warnings:

  - You are about to drop the `ProductTrial` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ProductTrial";

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productDescription" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "putToMarket" BOOLEAN NOT NULL DEFAULT true,
    "availableForTrade" BOOLEAN NOT NULL DEFAULT false,
    "totalStockQuantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(65,30) NOT NULL,
    "siloStockQuantity" INTEGER,
    "marketStockQuantity" INTEGER,
    "minimumSellingQuantity" INTEGER,
    "discountAvailable" BOOLEAN NOT NULL DEFAULT false,
    "discountRate" INTEGER NOT NULL DEFAULT 0,
    "categoryId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "sellerName" TEXT NOT NULL,
    "sellerLastname" TEXT NOT NULL,
    "website" TEXT,
    "logo" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT,
    "country" TEXT NOT NULL,
    "detailAdress" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_supplierId_key" ON "Address"("supplierId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
