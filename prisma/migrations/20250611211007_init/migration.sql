-- CreateTable
CREATE TABLE "ValidationRule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "parameters" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Validation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gliderModel" TEXT NOT NULL,
    "validationType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "details" JSONB NOT NULL,
    "technicianId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Validation_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "Technician" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ManufacturerData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Technician" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "certification" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "GliderModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "notes" TEXT
);

-- CreateTable
CREATE TABLE "GliderSize" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sizeLabel" TEXT NOT NULL,
    "minWeight" INTEGER NOT NULL,
    "maxWeight" INTEGER NOT NULL,
    "wingArea" REAL,
    "aspectRatio" REAL,
    "gliderModelId" INTEGER NOT NULL,
    CONSTRAINT "GliderSize_gliderModelId_fkey" FOREIGN KEY ("gliderModelId") REFERENCES "GliderModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LineSet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "gliderModelId" INTEGER NOT NULL,
    "gliderSizeId" INTEGER NOT NULL,
    CONSTRAINT "LineSet_gliderModelId_fkey" FOREIGN KEY ("gliderModelId") REFERENCES "GliderModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LineSet_gliderSizeId_fkey" FOREIGN KEY ("gliderSizeId") REFERENCES "GliderSize" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PhysicalLine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lineLabel" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "lineSetId" INTEGER NOT NULL,
    CONSTRAINT "PhysicalLine_lineSetId_fkey" FOREIGN KEY ("lineSetId") REFERENCES "LineSet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GroupMapping" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lineSetId" INTEGER NOT NULL,
    "physicalLineId" INTEGER NOT NULL,
    "groupLabel" TEXT NOT NULL,
    CONSTRAINT "GroupMapping_lineSetId_fkey" FOREIGN KEY ("lineSetId") REFERENCES "LineSet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GroupMapping_physicalLineId_fkey" FOREIGN KEY ("physicalLineId") REFERENCES "PhysicalLine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InspectionSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gliderModelId" INTEGER NOT NULL,
    "gliderSizeId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "technician" TEXT NOT NULL,
    CONSTRAINT "InspectionSession_gliderModelId_fkey" FOREIGN KEY ("gliderModelId") REFERENCES "GliderModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InspectionSession_gliderSizeId_fkey" FOREIGN KEY ("gliderSizeId") REFERENCES "GliderSize" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LineMeasurement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "inspectionSessionId" INTEGER NOT NULL,
    "physicalLineId" INTEGER NOT NULL,
    "measuredLength" REAL NOT NULL,
    CONSTRAINT "LineMeasurement_inspectionSessionId_fkey" FOREIGN KEY ("inspectionSessionId") REFERENCES "InspectionSession" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LineMeasurement_physicalLineId_fkey" FOREIGN KEY ("physicalLineId") REFERENCES "PhysicalLine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GroupAnalysis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "inspectionSessionId" INTEGER NOT NULL,
    "groupLabel" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "correction" TEXT,
    "details" TEXT,
    CONSTRAINT "GroupAnalysis_inspectionSessionId_fkey" FOREIGN KEY ("inspectionSessionId") REFERENCES "InspectionSession" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SizeLineLengths" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gliderSizeId" INTEGER NOT NULL,
    "lengths" JSONB NOT NULL,
    CONSTRAINT "SizeLineLengths_gliderSizeId_fkey" FOREIGN KEY ("gliderSizeId") REFERENCES "GliderSize" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ValidationRule_type_idx" ON "ValidationRule"("type");

-- CreateIndex
CREATE INDEX "Validation_gliderModel_idx" ON "Validation"("gliderModel");

-- CreateIndex
CREATE INDEX "ManufacturerData_brand_model_idx" ON "ManufacturerData"("brand", "model");

-- CreateIndex
CREATE UNIQUE INDEX "ManufacturerData_brand_model_key" ON "ManufacturerData"("brand", "model");

-- CreateIndex
CREATE INDEX "Technician_certification_idx" ON "Technician"("certification");
