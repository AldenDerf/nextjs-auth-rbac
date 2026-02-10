// import "dotenv/config";
import { PrismaClient } from "./generated/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Cache Prisma client and pg pool across hot reloads in dev.
const globalForPrisma = globalThis as unknown as {
  prisma: any;
  pgPool?: Pool;
};

const accelerateUrl = process.env.PRISMA_ACCELERATE_URL;
const connectionString = process.env.DATABASE_URL;

// Reuse the pool in dev to avoid creating multiple connections.
const pool =
  globalForPrisma.pgPool ??
  new Pool({
    connectionString,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.pgPool = pool;
}

// Prisma 7 "client" engine requires either accelerateUrl or adapter.
const baseClient = new PrismaClient(
  accelerateUrl ? { accelerateUrl } : { adapter: new PrismaPg(pool) },
);

export const prisma =
  globalForPrisma.prisma ??
  (accelerateUrl ? baseClient.$extends(withAccelerate()) : baseClient);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
