-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "status" VARCHAR(16) NOT NULL DEFAULT E'open',
    "subject" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "codeSnippet" TEXT,
    "linkToSandbox" VARCHAR(255),
    "roomId" VARCHAR(255),

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HelpOffer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "requestId" INTEGER NOT NULL,
    "helpSessionId" INTEGER,
    "status" TEXT,

    CONSTRAINT "HelpOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HelpSession" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "helpOfferId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "duration" INTEGER NOT NULL,

    CONSTRAINT "HelpSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestsToTech" (
    "requestId" INTEGER NOT NULL,
    "technologyId" INTEGER NOT NULL,

    CONSTRAINT "RequestsToTech_pkey" PRIMARY KEY ("requestId","technologyId")
);

-- CreateTable
CREATE TABLE "RequestsToLanguages" (
    "requestId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,

    CONSTRAINT "RequestsToLanguages_pkey" PRIMARY KEY ("requestId","languageId")
);

-- CreateIndex
CREATE UNIQUE INDEX "HelpSession_requestId_key" ON "HelpSession"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "HelpSession_helpOfferId_key" ON "HelpSession"("helpOfferId");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpOffer" ADD CONSTRAINT "HelpOffer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpOffer" ADD CONSTRAINT "HelpOffer_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpSession" ADD CONSTRAINT "HelpSession_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelpSession" ADD CONSTRAINT "HelpSession_helpOfferId_fkey" FOREIGN KEY ("helpOfferId") REFERENCES "HelpOffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestsToTech" ADD CONSTRAINT "RequestsToTech_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestsToTech" ADD CONSTRAINT "RequestsToTech_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestsToLanguages" ADD CONSTRAINT "RequestsToLanguages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestsToLanguages" ADD CONSTRAINT "RequestsToLanguages_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
