import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  //print logs 
  log: ["error", "query"],
});


export default prisma;