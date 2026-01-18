// Import PrismaClient - this is the main Prisma ORM class
// used to communicat with the database
import { PrismaClient } from "@prisma/client";

// Extednd the global object to optionally store  a PrismaClient instance
// This prevents creating multiple database  connection during hot reload
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Export a single PrismaClient instance
// Explanation of the logic below:
//
// 1. If a Prisma client already exists on the global object,
//  reuse it  (globalForPrisma.prisma)
// 2. Otherwise, create a new PrismaClient instance
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Log all SQL queries (useful fro development and debugging)
    log: ["query"],
  });

  // In development mode (NOT production):
  // Save the Prisma client on the global object
  // so it can be reused across hot reloads
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
