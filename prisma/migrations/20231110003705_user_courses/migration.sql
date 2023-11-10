-- AlterTable
ALTER TABLE "user_courses" ADD COLUMN     "success" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "doneDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "telegram" TEXT;
