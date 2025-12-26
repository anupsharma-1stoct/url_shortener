import { prisma } from "./client.js";

async function test() {
  await prisma.$connect();
  console.log("Prisma connected!");
}

test();