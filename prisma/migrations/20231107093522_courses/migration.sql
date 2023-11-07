/*
  Warnings:

  - You are about to drop the `cources_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_cources` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "user_cources" DROP CONSTRAINT "user_cources_courseId_fkey";

-- DropForeignKey
ALTER TABLE "user_cources" DROP CONSTRAINT "user_cources_userId_fkey";

-- DropTable
DROP TABLE "cources_category";

-- DropTable
DROP TABLE "user_cources";

-- CreateTable
CREATE TABLE "courses_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "courses_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_courses" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "doneDate" TIMESTAMP(3) NOT NULL,
    "required" BOOLEAN NOT NULL,
    "done" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "user_courses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "courses_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_courses" ADD CONSTRAINT "user_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_courses" ADD CONSTRAINT "user_courses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
