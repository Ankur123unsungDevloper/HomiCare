-- CreateEnum
CREATE TYPE "VerificationType" AS ENUM ('IDENTITY', 'PHONE', 'ADDRESS', 'BACKGROUND', 'EXPERIENCE', 'REFERENCES', 'QUALIFICATION');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'PASSED', 'FAILED', 'ACTION_REQUIRED');

-- CreateEnum
CREATE TYPE "VerificationDocumentStatus" AS ENUM ('PENDING_REVIEW', 'ACCEPTED', 'REJECTED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "HelperApplicationStatus" ADD VALUE 'UNDER_REVIEW';
ALTER TYPE "HelperApplicationStatus" ADD VALUE 'VERIFICATION_IN_PROGRESS';
ALTER TYPE "HelperApplicationStatus" ADD VALUE 'ACTION_REQUIRED';
ALTER TYPE "HelperApplicationStatus" ADD VALUE 'VERIFIED';

-- AlterTable
ALTER TABLE "HelperApplication" ADD COLUMN     "rejectionReason" TEXT,
ADD COLUMN     "reviewedById" TEXT;

-- CreateTable
CREATE TABLE "HelperVerification" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "reviewerId" TEXT,
    "type" "VerificationType" NOT NULL,
    "status" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "evidenceRequired" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HelperVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationDocument" (
    "id" TEXT NOT NULL,
    "verificationId" TEXT NOT NULL,
    "uploadedById" TEXT NOT NULL,
    "reviewedById" TEXT,
    "documentType" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "status" "VerificationDocumentStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "reviewNotes" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminAuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "applicationId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HelperVerification_applicationId_status_idx" ON "HelperVerification"("applicationId", "status");

-- CreateIndex
CREATE INDEX "HelperVerification_reviewerId_idx" ON "HelperVerification"("reviewerId");

-- CreateIndex
CREATE UNIQUE INDEX "HelperVerification_applicationId_type_key" ON "HelperVerification"("applicationId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationDocument_storageKey_key" ON "VerificationDocument"("storageKey");

-- CreateIndex
CREATE INDEX "VerificationDocument_verificationId_status_idx" ON "VerificationDocument"("verificationId", "status");

-- CreateIndex
CREATE INDEX "VerificationDocument_uploadedById_idx" ON "VerificationDocument"("uploadedById");

-- CreateIndex
CREATE INDEX "AdminAuditLog_actorId_createdAt_idx" ON "AdminAuditLog"("actorId", "createdAt");

-- CreateIndex
CREATE INDEX "AdminAuditLog_applicationId_createdAt_idx" ON "AdminAuditLog"("applicationId", "createdAt");

-- CreateIndex
CREATE INDEX "AdminAuditLog_entityType_entityId_idx" ON "AdminAuditLog"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "HelperApplication_createdAt_idx" ON "HelperApplication"("createdAt");

-- CreateIndex
CREATE INDEX "HelperApplication_reviewedById_idx" ON "HelperApplication"("reviewedById");

-- AddForeignKey
ALTER TABLE "HelperApplication" ADD CONSTRAINT "HelperApplication_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelperVerification" ADD CONSTRAINT "HelperVerification_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "HelperApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelperVerification" ADD CONSTRAINT "HelperVerification_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationDocument" ADD CONSTRAINT "VerificationDocument_verificationId_fkey" FOREIGN KEY ("verificationId") REFERENCES "HelperVerification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationDocument" ADD CONSTRAINT "VerificationDocument_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationDocument" ADD CONSTRAINT "VerificationDocument_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminAuditLog" ADD CONSTRAINT "AdminAuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminAuditLog" ADD CONSTRAINT "AdminAuditLog_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "HelperApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;
