/*
  Warnings:

  - You are about to drop the column `orderId` on the `Bill` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_orderId_fkey";

-- DropIndex
DROP INDEX "Bill_orderId_key";

-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "orderId";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "billId" TEXT;

-- CreateTable
CREATE TABLE "ProductInvestment" (
    "id" TEXT NOT NULL,
    "productID" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(65,30) NOT NULL,
    "customerID" TEXT NOT NULL,
    "supplierID" TEXT NOT NULL,
    "billID" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endingTime" TIMESTAMP(3),

    CONSTRAINT "ProductInvestment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInvestment" ADD CONSTRAINT "ProductInvestment_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInvestment" ADD CONSTRAINT "ProductInvestment_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInvestment" ADD CONSTRAINT "ProductInvestment_supplierID_fkey" FOREIGN KEY ("supplierID") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInvestment" ADD CONSTRAINT "ProductInvestment_billID_fkey" FOREIGN KEY ("billID") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
