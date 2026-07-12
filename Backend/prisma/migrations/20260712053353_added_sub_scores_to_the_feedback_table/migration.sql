-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "communicationScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "problemSolvingScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "technicalScore" INTEGER NOT NULL DEFAULT 0;
