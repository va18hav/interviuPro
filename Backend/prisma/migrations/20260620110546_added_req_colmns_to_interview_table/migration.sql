/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `Interview` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skills` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "sessionId" TEXT NOT NULL,
ADD COLUMN     "skills" TEXT NOT NULL,
ALTER COLUMN "jobDescription" DROP NOT NULL,
ALTER COLUMN "startedAt" DROP NOT NULL,
ALTER COLUMN "endedAt" DROP NOT NULL,
ALTER COLUMN "duration" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Interview_sessionId_key" ON "Interview"("sessionId");
