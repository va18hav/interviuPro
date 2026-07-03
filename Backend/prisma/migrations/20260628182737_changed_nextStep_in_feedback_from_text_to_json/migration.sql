-- AlterTable
ALTER TABLE "Feedback"
ALTER COLUMN "nextStep"
TYPE JSONB
USING "nextStep"::jsonb;