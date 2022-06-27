/*
  Warnings:

  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `githubUsername` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pictureUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ProgramLang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersToProgramLang` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersToProgramLang" DROP CONSTRAINT "UsersToProgramLang_programLangId_fkey";

-- DropForeignKey
ALTER TABLE "UsersToProgramLang" DROP CONSTRAINT "UsersToProgramLang_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bio",
DROP COLUMN "githubUsername",
DROP COLUMN "pictureUrl",
ADD COLUMN     "gitHubProfile" VARCHAR(255),
ADD COLUMN     "profilePic" TEXT NOT NULL DEFAULT E'https://firebasestorage.googleapis.com/v0/b/helper-duck.appspot.com/o/profilePics%2Fhackercat.jpg?alt=media&token=3cd1ed19-6dd5-47b1-8f19-9da64389cbb8',
ADD COLUMN     "userBio" TEXT;

-- DropTable
DROP TABLE "ProgramLang";

-- DropTable
DROP TABLE "UsersToProgramLang";

-- CreateTable
CREATE TABLE "Technology" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icon" TEXT,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersToTechnologies" (
    "userId" INTEGER NOT NULL,
    "technologyId" INTEGER NOT NULL,

    CONSTRAINT "UsersToTechnologies_pkey" PRIMARY KEY ("userId","technologyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Technology_name_key" ON "Technology"("name");

-- AddForeignKey
ALTER TABLE "UsersToTechnologies" ADD CONSTRAINT "UsersToTechnologies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersToTechnologies" ADD CONSTRAINT "UsersToTechnologies_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
