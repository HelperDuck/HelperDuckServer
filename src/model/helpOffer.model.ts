import { HelpRequest, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllHelpOffers() {
  try {
    const helpOffers = await prisma.helpOffer.findMany({
      include: {
        user: true,
        helpRequest: true,
        helpSession: true,
      },
    });
    return helpOffers;
  } catch (err) {
    console.log('Error at Model-getAllHelpOffers', err);
    return null;
  }
}
