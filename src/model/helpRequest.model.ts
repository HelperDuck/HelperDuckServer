import { HelpRequest, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllHelpRequests() {
  try {
    const requests = await prisma.helpRequest.findMany({
      include: {
        technologies: { include: { technology: true } },
        languages: { include: { language: true } },
        user: true,
      },
    });
    return requests;
  } catch (err) {
    console.log('Error at Model-getAllRequests', err);
    return null;
  }
}

export async function getHelpRequestById(id: number) {
  try {
    const request = await prisma.helpRequest.findUnique({
      where: {
        id: id,
      },
      include: {
        technologies: { include: { technology: true } },
        languages: { include: { language: true } },
        user: true,
      },
    });
    return request;
  } catch (err) {
    console.log('Error at Model-getRequestById', err);
    return null;
  }
}

export async function createHelpRequest(requestData: HelpRequest) {
  try {
    const request = await prisma.helpRequest.create({
      data: requestData,
    });
    return request;
  } catch (err) {
    console.log('Error at Model-createRequest', err);
    return null;
  }
}
