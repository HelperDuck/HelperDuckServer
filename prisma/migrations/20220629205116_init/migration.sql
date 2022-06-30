-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "uid" VARCHAR(255) NOT NULL,
    "userName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "userBio" TEXT,
    "gitHubProfile" VARCHAR(255),
    "profilePic" TEXT NOT NULL DEFAULT 'https://firebasestorage.googleapis.com/v0/b/helper-duck.appspot.com/o/profilePics%2Fhackercat.jpg?alt=media&token=3cd1ed19-6dd5-47b1-8f19-9da64389cbb8',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avgTip" DECIMAL(65,30) NOT NULL DEFAULT 20.21,
    "tipsReceived" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "tipsGiven" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "rating" DECIMAL(65,30) NOT NULL DEFAULT 5.21,
    "credits" DECIMAL(65,30) NOT NULL DEFAULT 10,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(8) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "nativeName" VARCHAR(255),
    "icon" TEXT,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersToLanguages" (
    "userId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "UsersToLanguages_pkey" PRIMARY KEY ("userId","languageId")
);

-- CreateTable
CREATE TABLE "HelpRequest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(16) NOT NULL DEFAULT 'open',
    "subject" VARCHAR(255) NOT NULL,
    "description" TEXT DEFAULT '',
    "codeSnippet" TEXT DEFAULT '',
    "linkToSandbox" VARCHAR(255) DEFAULT '',
    "roomId" VARCHAR(255) DEFAULT '',
    "tipGiven" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "HelpRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HelpOffer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "helpSessionId" INTEGER,
    "status" TEXT DEFAULT 'open',
    "helpRequestId" INTEGER NOT NULL,
    "reviewId" INTEGER,
    "tipReceived" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "HelpOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER DEFAULT 5,
    "comment" TEXT,
    "role" TEXT NOT NULL DEFAULT 'Helper',
    "userId" INTEGER,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Technology_name_key" ON "Technology"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Language_code_key" ON "Language"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- AddForeignKey
ALTER TABLE "UsersToTechnologies" ADD CONSTRAINT "UsersToTechnologies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersToTechnologies" ADD CONSTRAINT "UsersToTechnologies_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersToLanguages" ADD CONSTRAINT "UsersToLanguages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersToLanguages" ADD CONSTRAINT "UsersToLanguages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpRequest" ADD CONSTRAINT "HelpRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpOffer" ADD CONSTRAINT "HelpOffer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpOffer" ADD CONSTRAINT "HelpOffer_helpRequestId_fkey" FOREIGN KEY ("helpRequestId") REFERENCES "HelpRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpOffer" ADD CONSTRAINT "HelpOffer_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpRequestsToTech" ADD CONSTRAINT "HelpRequestsToTech_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpRequestsToTech" ADD CONSTRAINT "HelpRequestsToTech_helpRequestId_fkey" FOREIGN KEY ("helpRequestId") REFERENCES "HelpRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpRequestsToLanguages" ADD CONSTRAINT "HelpRequestsToLanguages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpRequestsToLanguages" ADD CONSTRAINT "HelpRequestsToLanguages_helpRequestId_fkey" FOREIGN KEY ("helpRequestId") REFERENCES "HelpRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
