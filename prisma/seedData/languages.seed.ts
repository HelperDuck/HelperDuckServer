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
        // icon: "https://www.countryflags.io/" + language.code + "/flat/64.png",
        icon: 'test',
        nativeName: language.nativeName,
      },
    });
    console.log(`Language: ${languageInput} has been created`);
  }
  console.log(`Seeding Languages has finished.`);
}
