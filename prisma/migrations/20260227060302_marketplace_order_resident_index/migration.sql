-- CreateIndex
CREATE INDEX "Order_residentId_idx" ON "Order"("residentId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident"("id") ON DELETE CASCADE ON UPDATE CASCADE;
