/*
  Warnings:

  - You are about to drop the column `onboardingCompleted` on the `User` table. All the data in the column will be lost.
  - Made the column `lastName` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `resumeUrl` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `resumeText` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "resumeUrl" SET NOT NULL,
ALTER COLUMN "resumeText" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "onboardingCompleted",
ADD COLUMN     "onboarding_step1" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "onboarding_step2" BOOLEAN NOT NULL DEFAULT false;
