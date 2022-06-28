import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllRequests({
  technologies,
  languages,
  status,
}: {
  technologies: any;
  languages: any;
  status: string;
}) {
  try {
    const requests = await prisma.request.findMany({
      // where: {
      //   technologies: {
      //     some: {
      //       technology: {
      //         name: technologies,
      //       },
      //     },
      //   },
      //   // status: {
      //   //   some: {
      //   //     name: status,
      //   //   },
      //   // },
      // },
    });

    return requests;
  } catch (err) {
    console.log('Error at Model-getAllRequests', err);
    return null;
  }
}
