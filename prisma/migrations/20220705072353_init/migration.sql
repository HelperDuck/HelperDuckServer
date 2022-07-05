/*
  Warnings:

  - You are about to drop the column `helpSessionId` on the `HelpOffer` table. All the data in the column will be lost.
  - You are about to drop the column `reviewId` on the `HelpOffer` table. All the data in the column will be lost.
  - You are about to alter the column `avgTip` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `tipsReceived` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `tipsGiven` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `rating` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `credits` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "HelpOffer" DROP COLUMN "helpSessionId",
DROP COLUMN "reviewId";

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "role" SET DEFAULT 'helpGiver';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avgTip" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "tipsReceived" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "tipsGiven" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "rating" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "credits" SET DEFAULT 100,
ALTER COLUMN "credits" SET DATA TYPE DECIMAL(10,2);
