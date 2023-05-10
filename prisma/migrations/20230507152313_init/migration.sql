/*
  Warnings:

  - The primary key for the `chat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_tags` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `chat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId]` on the table `comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[replyId]` on the table `comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `message` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `tag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `replyId` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `tag` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `gender` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- DropForeignKey
ALTER TABLE "_tags" DROP CONSTRAINT "_tags_A_fkey";

-- DropForeignKey
ALTER TABLE "_tags" DROP CONSTRAINT "_tags_B_fkey";

-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_userId_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_authorId_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_chatId_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_authorId_fkey";

-- AlterTable
ALTER TABLE "chat" DROP CONSTRAINT "chat_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "chatId" SET DATA TYPE TEXT,
ADD CONSTRAINT "chat_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "chat_id_seq";

-- AlterTable
ALTER TABLE "comment" DROP CONSTRAINT "comment_pkey",
ADD COLUMN     "authorId" TEXT,
ADD COLUMN     "replyId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "postId" SET DATA TYPE TEXT,
ADD CONSTRAINT "comment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "comment_id_seq";

-- AlterTable
ALTER TABLE "message" DROP CONSTRAINT "message_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "authorId" SET DATA TYPE TEXT,
ALTER COLUMN "chatId" SET DATA TYPE TEXT,
ADD CONSTRAINT "message_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "message_id_seq";

-- AlterTable
ALTER TABLE "post" DROP CONSTRAINT "post_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "authorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "post_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "post_id_seq";

-- AlterTable
ALTER TABLE "tag" ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "location" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL,
ALTER COLUMN "password" SET DATA TYPE VARCHAR(30),
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_id_seq";

-- DropTable
DROP TABLE "_tags";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Following" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_Following_AB_unique" ON "_Following"("A", "B");

-- CreateIndex
CREATE INDEX "_Following_B_index" ON "_Following"("B");

-- CreateIndex
CREATE UNIQUE INDEX "chat_id_key" ON "chat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "comment_id_key" ON "comment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "comment_postId_key" ON "comment"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "comment_replyId_key" ON "comment"("replyId");

-- CreateIndex
CREATE UNIQUE INDEX "message_id_key" ON "message"("id");

-- CreateIndex
CREATE UNIQUE INDEX "post_id_key" ON "post"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tag_id_key" ON "tag"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Following" ADD CONSTRAINT "_Following_A_fkey" FOREIGN KEY ("A") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Following" ADD CONSTRAINT "_Following_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
