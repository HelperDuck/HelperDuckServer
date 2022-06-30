import { PrismaClient } from '@prisma/client';
import { technologies } from './technologies';

const prisma = new PrismaClient();

export async function seedTechnologies() {
  console.log(`Start seeding ProgramLang`);

  for (const [key, value] of Object.entries(technologies)) {
    const programLang = await prisma.technology.create({
      data: {
        name: key,
        icon: value,
      },
    });
    // console.log(`Technology: ${key} has been created`);
  }
  console.log(`Seeding Technologies has finished.`);
}
