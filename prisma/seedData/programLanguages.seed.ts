import { PrismaClient } from '@prisma/client';
import { ProgrammingLanguages } from './programLanguages';

const prisma = new PrismaClient();

export async function seedProgramLang() {
  console.log(`Start seeding ProgramLang`);

  for (const [key, value] of Object.entries(ProgrammingLanguages)) {
    const programLang = await prisma.programLang.create({
      data: {
        name: key,
        icon: value,
      },
    });
    console.log(`Language: ${key} has been created`);
  }
  console.log(`Seeding ProgramLangs has finished.`);
}
