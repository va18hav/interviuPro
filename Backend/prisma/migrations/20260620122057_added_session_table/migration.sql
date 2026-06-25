/*
  Warnings:

  - You are about to drop the column `duration` on the `Interview` table. All the data in the column will be lost.
  - You are about to drop the column `endedAt` on the `Interview` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `Interview` table. All the data in the column will be lost.
  - Changed the type of `score` on the `Feedback` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `type` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "score",
ADD COLUMN     "score" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "duration",
DROP COLUMN "endedAt",
DROP COLUMN "startedAt",
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "duration" INTEGER,
    "transcript" JSONB NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
