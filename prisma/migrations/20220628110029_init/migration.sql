/*
  Warnings:

  - You are about to drop the column `requestId` on the `HelpOffer` table. All the data in the column will be lost.
  - You are about to drop the column `requestId` on the `HelpSession` table. All the data in the column will be lost.
  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RequestsToLanguages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RequestsToTech` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[helpRequestId]` on the table `HelpSession` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `helpRequestId` to the `HelpOffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `helpRequestId` to the `HelpSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HelpOffer" DROP CONSTRAINT "HelpOffer_requestId_fkey";

-- DropForeignKey
ALTER TABLE "HelpSession" DROP CONSTRAINT "HelpSession_requestId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_userId_fkey";

-- DropForeignKey
ALTER TABLE "RequestsToLanguages" DROP CONSTRAINT "RequestsToLanguages_languageId_fkey";

-- DropForeignKey
ALTER TABLE "RequestsToLanguages" DROP CONSTRAINT "RequestsToLanguages_requestId_fkey";

-- DropForeignKey
ALTER TABLE "RequestsToTech" DROP CONSTRAINT "RequestsToTech_requestId_fkey";

-- DropForeignKey
ALTER TABLE "RequestsToTech" DROP CONSTRAINT "RequestsToTech_technologyId_fkey";

-- DropIndex
DROP INDEX "HelpSession_requestId_key";

-- AlterTable
ALTER TABLE "HelpOffer" DROP COLUMN "requestId",
ADD COLUMN     "helpRequestId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "HelpSession" DROP COLUMN "requestId",
ADD COLUMN     "helpRequestId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Request";

-- DropTable
DROP TABLE "RequestsToLanguages";

-- DropTable
DROP TABLE "RequestsToTech";

-- CreateTable
CREATE TABLE "HelpRequest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(16) NOT NULL DEFAULT E'open',
    "subject" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "codeSnippet" TEXT,
    "linkToSandbox" VARCHAR(255),
    "roomId" VARCHAR(255),

    CONSTRAINT "HelpRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HelpRequestsToTech" (
    "helpRequestId" INTEGER NOT NULL,
    "technologyId" INTEGER NOT NULL,

    CONSTRAINT "HelpRequestsToTech_pkey" PRIMARY KEY ("helpRequestId","technologyId")
);

-- CreateTable
CREATE TABLE "HelpRequestsToLanguages" (
    "helpRequestId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "HelpRequestsToLanguages_pkey" PRIMARY KEY ("helpRequestId","languageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "HelpSession_helpRequestId_key" ON "HelpSession"("helpRequestId");

-- AddForeignKey
ALTER TABLE "HelpRequest" ADD CONSTRAINT "HelpRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpOffer" ADD CONSTRAINT "HelpOffer_helpRequestId_fkey" FOREIGN KEY ("helpRequestId") REFERENCES "HelpRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpSession" ADD CONSTRAINT "HelpSession_helpRequestId_fkey" FOREIGN KEY ("helpRequestId") REFERENCES "HelpRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpRequestsToTech" ADD CONSTRAINT "HelpRequestsToTech_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpRequestsToTech" ADD CONSTRAINT "HelpRequestsToTech_helpRequestId_fkey" FOREIGN KEY ("helpRequestId") REFERENCES "HelpRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpRequestsToLanguages" ADD CONSTRAINT "HelpRequestsToLanguages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpRequestsToLanguages" ADD CONSTRAINT "HelpRequestsToLanguages_helpRequestId_fkey" FOREIGN KEY ("helpRequestId") REFERENCES "HelpRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
