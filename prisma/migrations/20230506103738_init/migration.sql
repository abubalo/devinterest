/*
  Warnings:

  - You are about to alter the column `title` on the `post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `name` on the `tag` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `gender` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(7)`.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.

*/
-- AlterTable
ALTER TABLE "post" ALTER COLUMN "title" SET DATA TYPE VARCHAR(250);

-- AlterTable
ALTER TABLE "tag" ALTER COLUMN "name" SET DATA TYPE VARCHAR(15);

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "name" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "gender" SET DATA TYPE VARCHAR(7),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(15);
