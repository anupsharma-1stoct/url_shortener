import { prisma } from "./prisma/client";

export const incrementClick = async (short_code:string) => {
  return prisma.url.update({
    where: { short_code },
    data: {
      clickCount: { increment: 1 }
    }
  });
};

export const getByShortCode = async (short_code: string) =>{
  return prisma.url.findUnique({
    where: { short_code }
  });
}