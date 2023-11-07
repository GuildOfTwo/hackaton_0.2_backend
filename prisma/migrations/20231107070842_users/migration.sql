/*
  Warnings:

  - Made the column `firstSignIn` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "firstSignIn" SET NOT NULL;
