import { HelpRequest, PrismaClient, Technology } from '@prisma/client';
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
        helpOffers: { include: { user: true } },
        reviews: true,
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

export async function findHelpRequestsOR(search: {
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
            status: search.status,
          },
          {
            OR: [
              { user: { uid: search.userUid } },
              { user: { userName: search.userName } },
              { user: { id: search.userId } },
            ],
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

export async function findHelpRequestsAND(search: {
  technologies?: string[];
  userUid?: string;
  userName?: string;
  userId?: number;
  status?: string;
}) {
  try {
    search.status = search.status ? search.status : 'open';

    if (search.technologies?.length === 0) {
      let allTechnologiesData: Technology[] = await prisma.technology.findMany();
      search.technologies = allTechnologiesData.map((tech) => tech.name);
    }

    console.log('search', search);

    if (search.userName || (search.userId && search.userId > 0) || search.userUid) {
      console.log('searchViaUser');
      const findUser = await prisma.user.findFirst({
        where: {
          AND: [
            {
              OR: [{ uid: search.userUid }, { userName: search.userName }, { id: search.userId }],
            },
            {
              helpRequests: {
                some: {
                  status: search.status,
                  technologies: {
                    some: {
                      technology: {
                        name: { in: search.technologies },
                      },
                    },
                  },
                },
              },
            },
          ],
        },

        include: {
          helpRequests: true,
          // helpRequests: {
          // include: {
          //   technologies: { include: { technology: true } },
          // languages: { include: { language: true } },
          // user: true,
          // helpOffers: true,
          // },
          // },
        },
      });

      if (!findUser || !findUser.helpRequests) return null;

      return findUser.helpRequests;
    }
    // console.log('searchViaHelpRequests');
    const requests = await prisma.helpRequest.findMany({
      where: {
        AND: [
          {
            status: search.status,
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
        // languages: { include: { language: true } },
        // user: true,
        // helpOffers: true,
      },
    });
    return requests;
  } catch (err) {
    console.log('Error at Model-findRequests', err);
    return null;
  }
}

export async function updateHelpRequestForUser(userId: number, requestData: any) {
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

export async function updateHelpRequest(helpRequestId: number, requestData: any) {
  try {
    const request = await prisma.helpRequest.update({
      where: {
        id: helpRequestId,
      },
      data: requestData,
    });
    return request;
  } catch (err) {
    console.log('Error at Model-updateRequest', err);
    return null;
  }
}

export async function updateHelpRequestOnDeletion(userId: number) {
  try {
    const request = await prisma.helpRequest.updateMany({
      where: {
        userId: userId,
        status: 'open',
      },
      data: {
        status: 'cancelled',
      },
    });
    return request;
  } catch (err) {
    console.log('Error at Model-updateRequest', err);
    return null;
  }
}
