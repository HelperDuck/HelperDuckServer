import { PrismaClient, Prisma } from '@prisma/client';
import { seedTechnologies } from './seedData/technologies.seed';
import { seedLanguages } from './seedData/languages.seed';
import { seedUsers } from './seedData/users.seed';
import { seedRequests } from './seedData/request.seed';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  await seedTechnologies();
  await seedLanguages();
  await seedUsers();
  await seedRequests();

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
