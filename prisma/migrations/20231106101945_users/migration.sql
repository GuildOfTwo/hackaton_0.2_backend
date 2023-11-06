/*
  Warnings:

  - Added the required column `courseDuration` to the `cources` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cources" ADD COLUMN     "courseDuration" INTEGER NOT NULL;
