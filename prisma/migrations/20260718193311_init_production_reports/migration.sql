-- CreateTable
CREATE TABLE "production_reports" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "machine" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "shift" TEXT NOT NULL,
    "supervisor" TEXT,
    "preparedBy" TEXT NOT NULL,
    "remark" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "production_items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reportId" INTEGER NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "partNumber" TEXT NOT NULL,
    "color" TEXT,
    "productName" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "processing" TEXT,
    "barcode" TEXT,
    "formula" TEXT,
    "skinProcessing" TEXT,
    "preCustomer" TEXT,
    "remark" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "production_items_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "production_reports" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "production_reports_date_idx" ON "production_reports"("date");

-- CreateIndex
CREATE INDEX "production_reports_machine_date_idx" ON "production_reports"("machine", "date");

-- CreateIndex
CREATE INDEX "production_items_reportId_idx" ON "production_items"("reportId");

-- CreateIndex
CREATE INDEX "production_items_orderNumber_idx" ON "production_items"("orderNumber");

-- CreateIndex
CREATE INDEX "production_items_partNumber_idx" ON "production_items"("partNumber");
