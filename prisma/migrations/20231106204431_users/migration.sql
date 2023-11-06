/*
  Warnings:

  - You are about to drop the column `accesRoles` on the `users` table. All the data in the column will be lost.
  - Made the column `fistName` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "accesRoles",
ADD COLUMN     "accessRoles" TEXT[],
ALTER COLUMN "fistName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;
