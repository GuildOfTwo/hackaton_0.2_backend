-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "awards" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfEnd" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "awards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cources" (
    "id" SERIAL NOT NULL,
    "courseName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "doneDate" TIMESTAMP(3) NOT NULL,
    "required" BOOLEAN NOT NULL,
    "done" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "cources_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "awards" ADD CONSTRAINT "awards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cources" ADD CONSTRAINT "cources_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
