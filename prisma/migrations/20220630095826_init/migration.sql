-- DropForeignKey
ALTER TABLE "HelpRequest" DROP CONSTRAINT "HelpRequest_userId_fkey";

-- AlterTable
ALTER TABLE "HelpRequest" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "HelpRequest" ADD CONSTRAINT "HelpRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
