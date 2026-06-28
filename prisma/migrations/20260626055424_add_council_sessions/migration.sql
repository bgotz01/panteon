-- CreateTable
CREATE TABLE "CouncilSession" (
    "id" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "agentModels" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CouncilSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CouncilTurn" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CouncilTurn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CouncilMessage" (
    "id" TEXT NOT NULL,
    "turnId" TEXT NOT NULL,
    "agentIndex" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CouncilMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CouncilTurn_sessionId_idx" ON "CouncilTurn"("sessionId");

-- CreateIndex
CREATE INDEX "CouncilMessage_turnId_idx" ON "CouncilMessage"("turnId");

-- AddForeignKey
ALTER TABLE "CouncilTurn" ADD CONSTRAINT "CouncilTurn_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "CouncilSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CouncilMessage" ADD CONSTRAINT "CouncilMessage_turnId_fkey" FOREIGN KEY ("turnId") REFERENCES "CouncilTurn"("id") ON DELETE CASCADE ON UPDATE CASCADE;
