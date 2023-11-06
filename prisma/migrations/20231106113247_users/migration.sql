/*
  Warnings:

  - You are about to drop the column `dateOfEnd` on the `awards` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `awards` table. All the data in the column will be lost.
  - You are about to drop the column `done` on the `cources` table. All the data in the column will be lost.
  - You are about to drop the column `doneDate` on the `cources` table. All the data in the column will be lost.
  - You are about to drop the column `required` on the `cources` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `cources` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `cources` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `cources` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "awards" DROP CONSTRAINT "awards_userId_fkey";

-- DropForeignKey
ALTER TABLE "cources" DROP CONSTRAINT "cources_userId_fkey";

-- AlterTable
ALTER TABLE "awards" DROP COLUMN "dateOfEnd",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "cources" DROP COLUMN "done",
DROP COLUMN "doneDate",
DROP COLUMN "required",
DROP COLUMN "startDate",
DROP COLUMN "userId",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "user_awards" (
    "id" SERIAL NOT NULL,
    "awardId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "user_awards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cources_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "cources_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_cources" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "doneDate" TIMESTAMP(3) NOT NULL,
    "required" BOOLEAN NOT NULL,
    "done" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "user_cources_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_awards" ADD CONSTRAINT "user_awards_awardId_fkey" FOREIGN KEY ("awardId") REFERENCES "awards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_awards" ADD CONSTRAINT "user_awards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cources" ADD CONSTRAINT "cources_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "cources_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_cources" ADD CONSTRAINT "user_cources_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "cources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_cources" ADD CONSTRAINT "user_cources_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
