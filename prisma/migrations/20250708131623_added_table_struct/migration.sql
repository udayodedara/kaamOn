/*
  Warnings:

  - You are about to drop the `ReferralIncentive` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReferralIncentive" DROP CONSTRAINT "ReferralIncentive_referredUserId_fkey";

-- DropForeignKey
ALTER TABLE "ReferralIncentive" DROP CONSTRAINT "ReferralIncentive_referrerId_fkey";

-- DropForeignKey
ALTER TABLE "ReferralIncentive" DROP CONSTRAINT "ReferralIncentive_taskId_fkey";

-- DropTable
DROP TABLE "ReferralIncentive";

-- CreateTable
CREATE TABLE "referral_incentive" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "referrerId" INTEGER NOT NULL,
    "referredUserId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "referral_incentive_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "referral_incentive_uuid_key" ON "referral_incentive"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "referral_incentive_taskId_key" ON "referral_incentive"("taskId");

-- AddForeignKey
ALTER TABLE "referral_incentive" ADD CONSTRAINT "referral_incentive_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_incentive" ADD CONSTRAINT "referral_incentive_referredUserId_fkey" FOREIGN KEY ("referredUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_incentive" ADD CONSTRAINT "referral_incentive_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
