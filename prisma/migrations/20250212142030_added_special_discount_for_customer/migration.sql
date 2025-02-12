-- CreateTable
CREATE TABLE "SpecialDiscountForCustomer" (
    "id" TEXT NOT NULL,
    "productID" TEXT NOT NULL,
    "customerID" TEXT NOT NULL,
    "supplierID" TEXT NOT NULL,
    "discountRate" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpecialDiscountForCustomer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SpecialDiscountForCustomer" ADD CONSTRAINT "SpecialDiscountForCustomer_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialDiscountForCustomer" ADD CONSTRAINT "SpecialDiscountForCustomer_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialDiscountForCustomer" ADD CONSTRAINT "SpecialDiscountForCustomer_supplierID_fkey" FOREIGN KEY ("supplierID") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
