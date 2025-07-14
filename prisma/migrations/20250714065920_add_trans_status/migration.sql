/*
  Warnings:

  - Changed the type of `type` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('FAILED', 'PENDING', 'PROCESSING', 'REJECTED', 'SUCCESS');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEBIT', 'CREDIT');

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_taskId_fkey";

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "status" "TransactionStatus" NOT NULL DEFAULT 'PROCESSING',
DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL,
ALTER COLUMN "taskId" DROP NOT NULL;

-- DropEnum
DROP TYPE "TransactionTypes";

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
