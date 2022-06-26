/*
  Warnings:

  - The primary key for the `UsersToProgramLang` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `progLangId` on the `UsersToProgramLang` table. All the data in the column will be lost.
  - Added the required column `programLangId` to the `UsersToProgramLang` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UsersToProgramLang" DROP CONSTRAINT "UsersToProgramLang_progLangId_fkey";

-- AlterTable
ALTER TABLE "UsersToProgramLang" DROP CONSTRAINT "UsersToProgramLang_pkey",
DROP COLUMN "progLangId",
ADD COLUMN     "programLangId" INTEGER NOT NULL,
ADD CONSTRAINT "UsersToProgramLang_pkey" PRIMARY KEY ("userId", "programLangId");

-- AddForeignKey
ALTER TABLE "UsersToProgramLang" ADD CONSTRAINT "UsersToProgramLang_programLangId_fkey" FOREIGN KEY ("programLangId") REFERENCES "ProgramLang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
