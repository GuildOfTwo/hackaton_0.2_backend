/*
  Warnings:

  - Added the required column `image` to the `awards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "awards" ADD COLUMN     "image" TEXT NOT NULL;
