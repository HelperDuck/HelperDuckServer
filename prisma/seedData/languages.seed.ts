import { PrismaClient } from '@prisma/client';
import { Languages } from './languages';

const prisma = new PrismaClient();

export async function seedLanguages() {
  console.log(`Start seeding ProgramLang`);

  for (const language of Languages) {
    const languageInput = await prisma.language.create({
      data: {
        code: language.code,
        name: language.name,
        icon: `https://countryflagsapi.com/png/${language.code}`,
        nativeName: language.nativeName,
      },
    });
    // console.log(`Language: ${languageInput.name} has been created`);
  }
  console.log(`Seeding Languages has finished.`);
}
