/*
  Warnings:

  - You are about to drop the `ProgrammingLanguage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProgrammingLanguageToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProgrammingLanguageToUser" DROP CONSTRAINT "_ProgrammingLanguageToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProgrammingLanguageToUser" DROP CONSTRAINT "_ProgrammingLanguageToUser_B_fkey";

-- DropTable
DROP TABLE "ProgrammingLanguage";

-- DropTable
DROP TABLE "_ProgrammingLanguageToUser";

-- CreateTable
CREATE TABLE "ProgramLang" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "icon" TEXT,

    CONSTRAINT "ProgramLang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersToProgramLang" (
    "userId" INTEGER NOT NULL,
    "progLangId" INTEGER NOT NULL,

    CONSTRAINT "UsersToProgramLang_pkey" PRIMARY KEY ("userId","progLangId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProgramLang_name_key" ON "ProgramLang"("name");

-- AddForeignKey
ALTER TABLE "UsersToProgramLang" ADD CONSTRAINT "UsersToProgramLang_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersToProgramLang" ADD CONSTRAINT "UsersToProgramLang_progLangId_fkey" FOREIGN KEY ("progLangId") REFERENCES "ProgramLang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
