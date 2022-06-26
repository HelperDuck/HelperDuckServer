import { PrismaClient, Prisma } from '@prisma/client';
import { seedUsers } from './seedData/users.seed';
import { seedProgramLang } from './seedData/programLanguages.seed';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  await seedProgramLang();
  await seedUsers();

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
