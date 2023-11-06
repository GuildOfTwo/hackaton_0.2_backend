/*
  Warnings:

  - Added the required column `mentor` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mentor_tg` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "mentor" TEXT NOT NULL,
ADD COLUMN     "mentor_tg" TEXT NOT NULL;
