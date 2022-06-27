import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function deleteAndUpdateUsersToTechnologies(
  technologies: any,
  id: number
) {
  try {
    await deleteUsersToTechnologies(id);
    const technologiesUpdated = await updateUsersToTechnologies(
      technologies,
      id
    );
    return technologiesUpdated;
  } catch (err) {
    console.log('Error at updateTechnologies Controller', err);
  }
}

export async function deleteUsersToTechnologies(id: number) {
  try {
    await prisma.usersToTechnologies.deleteMany({
      where: {
        user: {
          id: id,
        },
      },
    });
  } catch (err) {
    console.log('Error at deleteTechnologies Controller', err);
  }
}

export async function updateUsersToTechnologies(technologies: any, id: number) {
  try {
    const technologiesUpdated = await prisma.user.update({
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
    return technologiesUpdated;
  } catch (err) {
    console.log('Error at updateUsersToTechnologies Model', err);
    // throw new Error(err);
  }
}
