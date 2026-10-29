import { PrismaClient } from "@prisma/client";

// Cliente unico: evita abrir varias conexoes com o hot reload do `next dev`.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
