/*
  Warnings:

  - You are about to drop the column `categories` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `growthAreas` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `hiringSuggestion` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `interviewId` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `interviewerNotes` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `recommendation` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `redFlags` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `strength` on the `Feedback` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionId]` on the table `Feedback` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `focusAreas` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nextStep` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strengths` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verdict` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `skills` on the `Interview` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "categories",
DROP COLUMN "growthAreas",
DROP COLUMN "hiringSuggestion",
DROP COLUMN "interviewId",
DROP COLUMN "interviewerNotes",
DROP COLUMN "recommendation",
DROP COLUMN "redFlags",
DROP COLUMN "strength",
ADD COLUMN     "focusAreas" JSONB NOT NULL,
ADD COLUMN     "nextStep" TEXT NOT NULL,
ADD COLUMN     "strengths" JSONB NOT NULL,
ADD COLUMN     "verdict" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "skills",
ADD COLUMN     "skills" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_sessionId_key" ON "Feedback"("sessionId");

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
