-- DropForeignKey
ALTER TABLE "HelpOffer" DROP CONSTRAINT "HelpOffer_reviewId_fkey";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "helpOfferId" INTEGER,
ADD COLUMN     "helpRequestId" INTEGER;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_helpRequestId_fkey" FOREIGN KEY ("helpRequestId") REFERENCES "HelpRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_helpOfferId_fkey" FOREIGN KEY ("helpOfferId") REFERENCES "HelpOffer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
