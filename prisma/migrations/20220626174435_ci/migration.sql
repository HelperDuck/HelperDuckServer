-- CreateTable
CREATE TABLE "ProgrammingLanguage" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "icon" TEXT,

    CONSTRAINT "ProgrammingLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProgrammingLanguageToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProgrammingLanguage_name_key" ON "ProgrammingLanguage"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ProgrammingLanguageToUser_AB_unique" ON "_ProgrammingLanguageToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProgrammingLanguageToUser_B_index" ON "_ProgrammingLanguageToUser"("B");

-- AddForeignKey
ALTER TABLE "_ProgrammingLanguageToUser" ADD CONSTRAINT "_ProgrammingLanguageToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ProgrammingLanguage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProgrammingLanguageToUser" ADD CONSTRAINT "_ProgrammingLanguageToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
