-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_slug_key" ON "Property"("slug");

-- AddColumn (nullable first for backfill)
ALTER TABLE "Resident" ADD COLUMN "propertyId" TEXT;

-- Insert default property and backfill existing residents
INSERT INTO "Property" ("id", "name", "slug", "address", "createdAt") VALUES ('default-property', 'Sunrise Towers', 'sunrise-towers', '100 Main St', CURRENT_TIMESTAMP);
UPDATE "Resident" SET "propertyId" = 'default-property';

-- Make propertyId required
ALTER TABLE "Resident" ALTER COLUMN "propertyId" SET NOT NULL;

-- Drop old unique, add new composite unique and index
DROP INDEX IF EXISTS "Resident_email_key";
CREATE UNIQUE INDEX "Resident_propertyId_email_key" ON "Resident"("propertyId", "email");
CREATE INDEX "Resident_propertyId_idx" ON "Resident"("propertyId");

-- AddForeignKey
ALTER TABLE "Resident" ADD CONSTRAINT "Resident_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
