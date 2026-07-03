/*
  Warnings:

  - You are about to drop the column `duration` on the `Interview` table. All the data in the column will be lost.
  - Made the column `resumeKey` on table `Resume` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "duration";

-- AlterTable
ALTER TABLE "Resume" ALTER COLUMN "resumeKey" SET NOT NULL;
