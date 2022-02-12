-- CreateTable
CREATE TABLE "Server" (
    "serverId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "BlogUser" (
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Blog" (
    "channelId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Server_serverId_key" ON "Server"("serverId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogUser_userId_key" ON "BlogUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_channelId_key" ON "Blog"("channelId");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "BlogUser"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
