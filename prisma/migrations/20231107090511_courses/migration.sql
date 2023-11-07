/*
  Warnings:

  - You are about to drop the column `courceId` on the `course_content` table. All the data in the column will be lost.
  - You are about to drop the `cources` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseId` to the `course_content` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cources" DROP CONSTRAINT "cources_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "course_content" DROP CONSTRAINT "course_content_courceId_fkey";

-- DropForeignKey
ALTER TABLE "user_cources" DROP CONSTRAINT "user_cources_courseId_fkey";

-- AlterTable
ALTER TABLE "course_content" DROP COLUMN "courceId",
ADD COLUMN     "courseId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "cources";

-- CreateTable
CREATE TABLE "courses" (
    "id" SERIAL NOT NULL,
    "courseName" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "courseDuration" INTEGER NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "course_content" ADD CONSTRAINT "course_content_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "cources_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_cources" ADD CONSTRAINT "user_cources_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
