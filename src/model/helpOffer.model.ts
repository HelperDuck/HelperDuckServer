import { HelpOffer, HelpRequest, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllHelpOffers() {
  try {
    const helpOffers = await prisma.helpOffer.findMany({
      include: {
        user: true,
        helpRequest: true,
        review: true,
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
        review: true,
        // helpSession: true,
      },
    });
    return helpOffer;
  } catch (err) {
    console.log('Error at Model-getHelpOfferById', err);
    return null;
  }
}

export async function createHelpOffer(helpOfferData: HelpOffer) {
  try {
    const helpOffer = await prisma.helpOffer.create({
      data: {
        user: { connect: { id: helpOfferData.userId } },
        helpRequest: { connect: { id: helpOfferData.helpRequestId } },
        status: 'open',
      },
      include: {
        user: true,
        helpRequest: true,
        review: true,
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
