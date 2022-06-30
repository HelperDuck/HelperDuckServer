import { HelpRequest, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllHelpRequests() {
  try {
    const requests = await prisma.helpRequest.findMany({
      include: {
        technologies: { include: { technology: true } },
        languages: { include: { language: true } },
        user: true,
        helpOffers: true,
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
        helpOffers: true,
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

export async function deleteHelpRequest(helpRequestId: number) {
  try {
    const request = await prisma.helpRequest.delete({
      where: {
        id: helpRequestId,
      },
    });
    return request;
  } catch (err) {
    console.log('Error at Model-deleteRequest', err);
    return null;
  }
}

export async function findHelpRequests(search: {
  helpRequestId?: number;
  technologies?: string[];
  userUid?: string;
  userName?: string;
  userId?: number;
  status?: string;
}) {
  try {
    const requests = await prisma.helpRequest.findMany({
      where: {
        OR: [
          {
            id: search.helpRequestId,
          },
          {
            status: search.status,
          },

          {
            userId: search.userId,
          },
          {
            user: {
              uid: search.userUid,
            },
          },
          {
            user: {
              userName: search.userName,
            },
          },
          {
            technologies: {
              some: {
                technology: {
                  name: { in: search.technologies },
                },
              },
            },
          },
        ],
      },
      include: {
        technologies: { include: { technology: true } },
        languages: { include: { language: true } },
        user: true,
        helpOffers: true,
      },
    });
    return requests;
  } catch (err) {
    console.log('Error at Model-findRequests', err);
    return null;
  }
}

export async function updateHelpRequestForUser(
  userId: number,
  requestData: any
) {
  try {
    const request = await prisma.helpRequest.updateMany({
      where: {
        userId: userId,
      },
      data: requestData,
    });
    return request;
  } catch (err) {
    console.log('Error at Model-updateRequest', err);
    return null;
  }
}
