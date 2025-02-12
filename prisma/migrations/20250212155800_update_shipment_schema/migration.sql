/*
  Warnings:

  - You are about to drop the column `shipperId` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the `Shipper` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `companyName` to the `Shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipmentType` to the `Shipment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shipment" DROP CONSTRAINT "Shipment_shipperId_fkey";

-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "shipperId",
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "shipmentType" TEXT NOT NULL;

-- DropTable
DROP TABLE "Shipper";
