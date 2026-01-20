import "dotenv/config";
import { PrismaClient } from "./generated/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    accelerateUrl: process.env.PRISMA_ACCELERATE_URL!,
  }).$extends(withAccelerate());

// if (process.env.NODE_ENV !== "production") {
//     globalForPrisma.prisma = prisma;
// }

export default prisma;
