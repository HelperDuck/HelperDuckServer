import { HelpOffer, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllHelpOffers() {
  try {
    const helpOffers = await prisma.helpOffer.findMany({
      include: {
        user: true,
        helpRequest: true,
        reviews: true,
      },
    });
    return helpOffers;
  } catch (err) {
    console.log('Error at Model-getAllHelpOffers', err);
    return null;
  }
}

export async function getHelpOfferById(id: number) {
  try {
    const helpOffer = await prisma.helpOffer.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
        helpRequest: true,
        reviews: true,
        // helpSession: true,
      },
    });
    return helpOffer;
  } catch (err) {
    console.log('Error at Model-getHelpOfferById', err);
    return null;
  }
}

export async function createHelpOffer(helpOfferData: HelpOffer, status: string) {
  try {
    if (!helpOfferData.helpRequestId) return null;
    const helpOffer = await prisma.helpOffer.create({
      data: {
        user: { connect: { id: helpOfferData.userId } },
        helpRequest: { connect: { id: helpOfferData.helpRequestId } },
        status: status,
      },
      include: {
        user: true,
        helpRequest: true,
        reviews: true,
        // helpSession: true,
      },
    });
    return helpOffer;
  } catch (err) {
    console.log('Error at Model-createHelpOffer', err);
    return null;
  }
}

export async function updateHelpOffer(helpOfferId: number, requestData: any) {
  try {
    const request = await prisma.helpOffer.update({
      where: {
        id: helpOfferId,
      },
      data: requestData,
      include: {
        user: true,
        helpRequest: true,
      },
    });
    return request;
  } catch (err) {
    console.log('Error at Model-updateRequest', err);
    return null;
  }
}

export async function findHelpOffersOR(search: {
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

export async function findHelpOffersAND(search: {
  technologies?: string[];
  userUid?: string;
  userName?: string;
  userId?: number;
  status?: string;
}) {
  try {
    search.status = search.status ? search.status : 'solved';

    return null;
  } catch (err) {
    console.log('Error at Model-findRequests', err);
    return null;
  }
}

export async function findHelpOffersByUserId(
  userId: number,
  search: {
    technologies?: string[];
    status?: string;
  }
) {
  try {
    // console.log('search', search);
    const requests = await prisma.helpOffer.findMany({
      where: {
        AND: [{ userId: userId }, { status: search.status }],
      },
      include: {
        helpRequest: true,
        reviews: true,
      },
    });
    return requests;
  } catch (err) {
    console.log('Error at Model-findRequests', err);
    return null;
  }
}
