import { PrismaClient } from '@prisma/client';
import { Languages } from './languages';

const prisma = new PrismaClient();

// export async function seedProgramLang() {
//   console.log(`Start seeding ProgramLang`);

//   for (const language in Languages) {
//     const language = await prisma.({
//       data: {
//         code: key,
//         icon: value,
//       },
//   }
//   console.log(`Language: ${key} has been created`);
//   }
//   console.log(`Seeding ProgramLangs has finished.`);
// }
