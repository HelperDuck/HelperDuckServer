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
            return { language: { connect: { code: lang.language.code } } };
          }),
        },
      },
    });
  } catch (err) {
    console.log('Error at updateUsersToLanguages Model', err);
    return null;
  }
}

export async function createHelpRequestToLanguages(helpRequestId: number, languages: any[]) {
  try {
    return await prisma.helpRequest.update({
      where: {
        id: helpRequestId,
      },
      data: {
        languages: {
          create: languages.map((lang: any) => {
            return { language: { connect: { code: lang.language.code } } };
          }),
        },
      },
    });
  } catch (err) {
    console.log('Error at updateHelpRequestToLanguages Model', err);
    return null;
  }
}

export async function deleteHelpRequestFromLanguages(helpRequestId: number) {
  try {
    return await prisma.helpRequestsToLanguages.deleteMany({
      where: {
        helpRequestId: helpRequestId,
      },
    });
  } catch (err) {
    console.log('Error at deleteHelpRequestFromLanguages Model', err);
    return null;
  }
}
