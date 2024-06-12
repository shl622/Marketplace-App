/*
  Warnings:

  - A unique constraint covering the columns `[testing]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "testing" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_testing_key" ON "User"("testing");
