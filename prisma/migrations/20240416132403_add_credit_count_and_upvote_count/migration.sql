-- AlterTable
ALTER TABLE "Memes" ADD COLUMN     "upvotes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 5;