-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'INSTRUCTOR', 'TRAINEE', 'MEMBER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'MEMBER';
