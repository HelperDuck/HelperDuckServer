-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'Helper',
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
