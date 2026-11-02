-- CreateEnum
CREATE TYPE "HelperApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "HelperApplication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "services" TEXT[],
    "experience" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "experienceDetails" TEXT,
    "status" "HelperApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HelperApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HelperApplication_userId_idx" ON "HelperApplication"("userId");

-- CreateIndex
CREATE INDEX "HelperApplication_status_idx" ON "HelperApplication"("status");

-- AddForeignKey
ALTER TABLE "HelperApplication" ADD CONSTRAINT "HelperApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
