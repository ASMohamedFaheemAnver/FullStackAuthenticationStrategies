import { PrismaClient } from "@prisma/client";
import { isProd } from "./utils";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (isProd) globalThis.prisma = db;
