/*
  Warnings:

  - You are about to drop the column `country` on the `Address` table. All the data in the column will be lost.
  - Added the required column `neighborhood` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "country",
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL;
