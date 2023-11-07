-- CreateEnum
CREATE TYPE "roles" AS ENUM ('employee', 'owner');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" "roles"[] DEFAULT ARRAY['employee']::"roles"[],
    "activated" BOOLEAN NOT NULL DEFAULT false,
    "activationKey" TEXT,
    "activationKeyCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "recoveryPasswordKey" TEXT,
    "recoveryPasswordKeyCreated" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_activationKey_key" ON "users"("activationKey");

-- CreateIndex
CREATE UNIQUE INDEX "users_recoveryPasswordKey_key" ON "users"("recoveryPasswordKey");
