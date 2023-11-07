-- CreateTable
CREATE TABLE "cource_content" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "courceId" INTEGER NOT NULL,

    CONSTRAINT "cource_content_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cource_content" ADD CONSTRAINT "cource_content_courceId_fkey" FOREIGN KEY ("courceId") REFERENCES "cources"("id") ON DELETE CASCADE ON UPDATE CASCADE;
