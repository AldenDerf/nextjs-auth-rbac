import { PrismaClient } from "./generated/client";
import bcrypt from "bcrypt";

async function main() {
  const password = await bcrypt.hash("password123", 10);

  await prisma.user.upsert({
    where: { email: "admin@.com" },
    update: {},
    create: {
      email: "admin@test.com",
      password,
      role: "admin",
    },
  });
}

main();
