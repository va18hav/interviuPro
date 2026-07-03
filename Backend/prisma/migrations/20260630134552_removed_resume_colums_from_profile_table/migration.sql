/*
  Warnings:

  - You are about to drop the column `resumeText` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `resumeUrl` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "resumeText",
DROP COLUMN "resumeUrl";
