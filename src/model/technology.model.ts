import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllTechnologies() {
  try {
    const allTechnologies = await prisma.technology.findMany();
    return allTechnologies;
  } catch (err) {
    console.log('Error at Model-getAllTechnologies', err);
    return null;
  }
}

export async function deleteUsersToTechnologies(id: number) {
  try {
    return await prisma.usersToTechnologies.deleteMany({
      where: {
        user: {
          id: id,
        },
      },
    });
  } catch (err) {
    console.log('Error at deleteTechnologies model', err);
    return null;
  }
}

export async function createUsersToTechnologies(technologies: any, id: number) {
  try {
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        technologies: {
          create: technologies.map((tech: any) => {
            return { technology: { connect: { name: tech.technology.name } } };
          }),
        },
      },
    });
  } catch (err) {
    console.log('Error at updateUsersToTechnologies Model', err);
    return null;
  }
}

export async function createHelpRequestToTechnologies(
  helpRequestId: number,
  technologies: any[]
) {
  try {
    return await prisma.helpRequest.update({
      where: {
        id: helpRequestId,
      },
      data: {
        technologies: {
          create: technologies.map((tech: any) => {
            return { technology: { connect: { name: tech.technology.name } } };
          }),
        },
      },
    });
  } catch (err) {
    console.log('Error at updateUsersToTechnologies Model', err);
    return null;
  }
}
