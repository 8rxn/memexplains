/*
  Warnings:

  - You are about to drop the column `upvotes` on the `Memes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Memes" DROP COLUMN "upvotes";

-- CreateTable
CREATE TABLE "Upvotes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "memeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Upvotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Upvotes" ADD CONSTRAINT "Upvotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvotes" ADD CONSTRAINT "Upvotes_memeId_fkey" FOREIGN KEY ("memeId") REFERENCES "Memes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
