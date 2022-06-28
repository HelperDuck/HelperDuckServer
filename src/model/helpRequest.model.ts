import { HelpRequest, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllRequests() {
  try {
    const requests = await prisma.helpRequest.findMany({
      include: {
        technologies: { include: { technology: true } },
        languages: { include: { language: true } },
      },
    });
    return requests;
  } catch (err) {
    console.log('Error at Model-getAllRequests', err);
    return null;
  }
}

export async function getRequestById(id: number) {
  try {
    const request = await prisma.helpRequest.findUnique({
      where: {
        id: id,
      },
      include: {
        technologies: { include: { technology: true } },
        languages: { include: { language: true } },
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
