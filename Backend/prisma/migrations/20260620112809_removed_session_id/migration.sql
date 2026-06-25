/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Interview` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Interview_sessionId_key";

-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "sessionId";
