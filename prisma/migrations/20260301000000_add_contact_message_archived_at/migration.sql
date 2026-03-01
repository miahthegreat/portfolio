-- AlterTable
ALTER TABLE "ContactMessage" ADD COLUMN "archivedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "ContactMessage_archivedAt_idx" ON "ContactMessage"("archivedAt");
