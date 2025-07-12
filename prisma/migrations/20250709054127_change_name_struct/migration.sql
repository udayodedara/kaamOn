/*
  Warnings:

  - You are about to drop the column `displayName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `users` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "displayName",
DROP COLUMN "fullName",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
