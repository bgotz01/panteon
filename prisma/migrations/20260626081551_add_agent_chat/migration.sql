-- CreateTable
CREATE TABLE "AgentChat" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgentChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentChatMessage" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgentChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AgentChatMessage_chatId_idx" ON "AgentChatMessage"("chatId");

-- AddForeignKey
ALTER TABLE "AgentChatMessage" ADD CONSTRAINT "AgentChatMessage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "AgentChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
