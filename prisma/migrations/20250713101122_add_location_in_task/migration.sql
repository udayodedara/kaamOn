/*
  Warnings:

  - Added the required column `location` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "location" TEXT NOT NULL;
