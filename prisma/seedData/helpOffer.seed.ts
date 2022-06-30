import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

function generateInput(userId: number): Prisma.HelpOfferCreateInput[] {
  return [
    {
      user: { connect: { id: userId + 2 } },
      helpRequest: { connect: { id: userId + 1 } },
      status: 'open',
    },
    {
      user: { connect: { id: userId + 2 } },
      helpRequest: { connect: { id: userId + 2 } },
      status: 'accepted',
    },
    {
      user: { connect: { id: userId + 2 } },
      helpRequest: { connect: { id: userId + 3 } },
      status: 'declined',
    },
  ];
}

function generateForAllUsers() {
  let dataForAllUsers: any[] = [];
  for (let i = 1; i <= 5; i++) {
    const input = [...generateInput(i)];
    dataForAllUsers.push(...input);
  }
  return dataForAllUsers;
}

export async function seedHelpOffers() {
  console.log(`Start seeding helpOffers`);
  const helpOfferData = generateForAllUsers();
  for (const r of helpOfferData) {
    const offer = await prisma.helpOffer.create({
      data: r,
    });
    console.log(`Created helpOffer ${offer.id}`);
  }
}
