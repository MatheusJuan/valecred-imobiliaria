-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('VENDA', 'ALUGUEL', 'LANCAMENTO');

-- CreateEnum
CREATE TYPE "PropertyCategory" AS ENUM ('CASA', 'APARTAMENTO', 'TERRENO', 'COMERCIAL', 'CASA_CONDOMINIO');

-- CreateEnum
CREATE TYPE "LeadType" AS ENUM ('CONTATO', 'VISITA', 'INTERESSE');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NOVO', 'CONTATADO', 'CONVERTIDO', 'ARQUIVADO');

-- CreateEnum
CREATE TYPE "RequestState" AS ENUM ('PENDENTE', 'APROVADA', 'REJEITADA');

-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(12,2),
    "condoFee" DECIMAL(12,2),
    "insurance" DECIMAL(12,2),
    "status" "PropertyStatus" NOT NULL,
    "category" "PropertyCategory" NOT NULL,
    "area" DECIMAL(10,2) NOT NULL,
    "bedrooms" INTEGER NOT NULL DEFAULT 0,
    "bathrooms" INTEGER NOT NULL DEFAULT 0,
    "parking" INTEGER NOT NULL DEFAULT 0,
    "rooms" INTEGER,
    "floors" INTEGER,
    "city" TEXT NOT NULL,
    "state" VARCHAR(2) NOT NULL DEFAULT 'SP',
    "neighborhood" TEXT NOT NULL,
    "address" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "images" TEXT[],
    "features" TEXT[],
    "videoUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "agentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "floor_plans" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "area" DECIMAL(10,2) NOT NULL,
    "bedrooms" INTEGER NOT NULL DEFAULT 0,
    "bathrooms" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL,
    "description" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "floor_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "creci" TEXT,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT,
    "photo" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_leads" (
    "id" TEXT NOT NULL,
    "type" "LeadType" NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "message" TEXT,
    "preferredDate" TIMESTAMP(3),
    "propertyId" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NOVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advertise_requests" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "status" "PropertyStatus" NOT NULL,
    "category" "PropertyCategory" NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "address" TEXT,
    "price" DECIMAL(12,2),
    "area" DECIMAL(10,2),
    "description" TEXT,
    "images" TEXT[],
    "state" "RequestState" NOT NULL DEFAULT 'PENDENTE',
    "approvedPropertyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "advertise_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_articles" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "home_banners" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "buttonLabel" TEXT,
    "link" TEXT,
    "image" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "home_banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "code_sequences" (
    "prefix" VARCHAR(4) NOT NULL,
    "last" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "code_sequences_pkey" PRIMARY KEY ("prefix")
);

-- CreateIndex
CREATE UNIQUE INDEX "properties_code_key" ON "properties"("code");

-- CreateIndex
CREATE INDEX "properties_status_isPrivate_idx" ON "properties"("status", "isPrivate");

-- CreateIndex
CREATE INDEX "properties_city_idx" ON "properties"("city");

-- CreateIndex
CREATE INDEX "properties_featured_idx" ON "properties"("featured");

-- CreateIndex
CREATE INDEX "floor_plans_propertyId_idx" ON "floor_plans"("propertyId");

-- CreateIndex
CREATE INDEX "property_leads_status_createdAt_idx" ON "property_leads"("status", "createdAt");

-- CreateIndex
CREATE INDEX "property_leads_propertyId_idx" ON "property_leads"("propertyId");

-- CreateIndex
CREATE INDEX "advertise_requests_state_createdAt_idx" ON "advertise_requests"("state", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "blog_articles_slug_key" ON "blog_articles"("slug");

-- CreateIndex
CREATE INDEX "blog_articles_publishedAt_idx" ON "blog_articles"("publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "agents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "floor_plans" ADD CONSTRAINT "floor_plans_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_leads" ADD CONSTRAINT "property_leads_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

