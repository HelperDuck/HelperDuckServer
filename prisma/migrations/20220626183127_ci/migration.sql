/*
  Warnings:

  - Made the column `name` on table `ProgramLang` required. This step will fail if there are existing NULL values in that column.
  - Made the column `icon` on table `ProgramLang` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProgramLang" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "icon" SET NOT NULL;
