-- DropForeignKey
ALTER TABLE "HelpOffer" DROP CONSTRAINT "HelpOffer_helpRequestId_fkey";

-- AlterTable
ALTER TABLE "HelpOffer" ALTER COLUMN "helpRequestId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "HelpOffer" ADD CONSTRAINT "HelpOffer_helpRequestId_fkey" FOREIGN KEY ("helpRequestId") REFERENCES "HelpRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
