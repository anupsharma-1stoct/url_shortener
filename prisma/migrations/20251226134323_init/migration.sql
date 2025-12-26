/*
  Warnings:

  - You are about to drop the column `originalUrl` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `shortCode` on the `Url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[short_code]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `original_url` to the `Url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short_code` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Url_shortCode_key";

-- AlterTable
ALTER TABLE "Url" DROP COLUMN "originalUrl",
DROP COLUMN "shortCode",
ADD COLUMN     "original_url" TEXT NOT NULL,
ADD COLUMN     "short_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Url_short_code_key" ON "Url"("short_code");
