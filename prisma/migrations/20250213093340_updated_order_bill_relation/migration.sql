/*
  Warnings:

  - You are about to drop the column `billID` on the `ProductInvestment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[billId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[billId]` on the table `ProductInvestment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ProductInvestment" DROP CONSTRAINT "ProductInvestment_billID_fkey";

-- AlterTable
ALTER TABLE "ProductInvestment" DROP COLUMN "billID",
ADD COLUMN     "billId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_billId_key" ON "Order"("billId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductInvestment_billId_key" ON "ProductInvestment"("billId");

-- AddForeignKey
ALTER TABLE "ProductInvestment" ADD CONSTRAINT "ProductInvestment_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE SET NULL ON UPDATE CASCADE;
