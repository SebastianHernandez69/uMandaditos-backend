/*
  Warnings:

  - Made the column `acceptedAt` on table `Ride` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Ride" ALTER COLUMN "acceptedAt" SET NOT NULL,
ALTER COLUMN "acceptedAt" SET DEFAULT CURRENT_TIMESTAMP;
