-- AlterTable
ALTER TABLE "Interview" ALTER COLUMN "type" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Technical Round';
