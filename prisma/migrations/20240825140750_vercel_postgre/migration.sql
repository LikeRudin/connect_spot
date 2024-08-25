-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT,
    "email" TEXT,
    "avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spot" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Spot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spot_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "spot_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpotConnect" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "spotId" INTEGER NOT NULL,

    CONSTRAINT "SpotConnect_pkey" PRIMARY KEY ("spotId","userId")
);

-- CreateTable
CREATE TABLE "SpotMarker" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "spotId" INTEGER NOT NULL,

    CONSTRAINT "SpotMarker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpotMarkerConnect" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "spotMarkerId" INTEGER NOT NULL,

    CONSTRAINT "SpotMarkerConnect_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "Spot_userId_idx" ON "Spot"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "spot_category_name_key" ON "spot_category"("name");

-- CreateIndex
CREATE INDEX "SpotMarker_userId_idx" ON "SpotMarker"("userId");

-- CreateIndex
CREATE INDEX "SpotMarker_spotId_idx" ON "SpotMarker"("spotId");

-- CreateIndex
CREATE INDEX "SpotMarkerConnect_userId_idx" ON "SpotMarkerConnect"("userId");

-- CreateIndex
CREATE INDEX "SpotMarkerConnect_spotMarkerId_idx" ON "SpotMarkerConnect"("spotMarkerId");

-- AddForeignKey
ALTER TABLE "Spot" ADD CONSTRAINT "Spot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spot" ADD CONSTRAINT "Spot_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "spot_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotConnect" ADD CONSTRAINT "SpotConnect_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotConnect" ADD CONSTRAINT "SpotConnect_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "Spot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotMarker" ADD CONSTRAINT "SpotMarker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotMarker" ADD CONSTRAINT "SpotMarker_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "Spot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotMarkerConnect" ADD CONSTRAINT "SpotMarkerConnect_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotMarkerConnect" ADD CONSTRAINT "SpotMarkerConnect_spotMarkerId_fkey" FOREIGN KEY ("spotMarkerId") REFERENCES "SpotMarker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
