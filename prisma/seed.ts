import { PrismaClient, Prisma } from '@prisma/client';
import { seedTechnologies } from './seedData/technologies.seed';
import { seedLanguages } from './seedData/languages.seed';
import { seedUsers } from './seedData/users.seed';
import { seedHelpRequests } from './seedData/helpRequest.seed';
import { seedHelpOffers } from './seedData/helpOffer.seed';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  await seedTechnologies();
  await seedLanguages();
  await seedUsers();
  await seedHelpRequests();
  await seedHelpOffers();

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
