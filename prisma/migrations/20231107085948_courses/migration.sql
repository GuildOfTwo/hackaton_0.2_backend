/*
  Warnings:

  - You are about to drop the column `content` on the `cources` table. All the data in the column will be lost.
  - You are about to drop the `cource_content` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cource_content" DROP CONSTRAINT "cource_content_courceId_fkey";

-- AlterTable
ALTER TABLE "cources" DROP COLUMN "content";

-- DropTable
DROP TABLE "cource_content";

-- CreateTable
CREATE TABLE "course_content" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "courceId" INTEGER NOT NULL,

    CONSTRAINT "course_content_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "course_content" ADD CONSTRAINT "course_content_courceId_fkey" FOREIGN KEY ("courceId") REFERENCES "cources"("id") ON DELETE CASCADE ON UPDATE CASCADE;
