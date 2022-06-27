import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllLanguages() {
  try {
    return await prisma.language.findMany();
  } catch (err) {
    console.log('Error at Model-getAllLanguages', err);
    return null;
  }
}

export async function deleteUsersToLanguages(id: number) {
  try {
    return await prisma.usersToLanguages.deleteMany({
      where: {
        user: {
          id: id,
        },
      },
    });
  } catch (err) {
    console.log('Error at deleteLanguages model', err);
    return null;
  }
}

export async function createUsersToLanguages(languages: any, id: number) {
  try {
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        languages: {
          create: languages.map((lang: any) => {
            return { language: { connect: { name: lang.language.name } } };
          }),
        },
      },
    });
  } catch (err) {
    console.log('Error at updateUsersToLanguages Model', err);
    return null;
  }
}
