import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function findUniqueUser(
  uid: string,
  email?: string,
  userName?: string
) {
  try {
    const user = await prisma.user.findFirst({
      where: { OR: [{ uid: uid }, { userName: userName }, { email: email }] },
    });

    return user;
  } catch (err) {
    console.log('Error at Model-findUniqueUser', err);
    return null;
  }
}

export async function findUserComplete(uid: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        uid: uid,
      },
      include: {
        technologies: { include: { technology: true } },
        languages: { include: { language: true } },
      },
    });

    if (!user) return null;

    //Added fields but needs to be queried for
    const userComplete = {
      ...user,
      openedRequests: 20,
      acceptedRequests: 2,
      avgTip: 20.21,
      rating: 4.5,
    };

    return userComplete;
  } catch (err) {
    console.log('Error at Model-findUserComplete', err);
    return null;
  }
}

export async function updateUser(user: any) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        uid: user.uid,
      },
      data: user,
    });

    return updatedUser;
  } catch (err) {
    console.log('Error at Model-updateUser', err);
    return null;
  }
}

export async function createUser(user: any) {
  try {
    const createdUser = await prisma.user.create({
      data: user,
    });

    return createdUser;
  } catch (err) {
    console.log('Error at Model-createUser', err);
    return null;
  }
}

export async function deleteUser(uid: string) {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        uid: uid,
      },
    });

    return deletedUser;
  } catch (err) {
    console.log('Error at Model-deleteUser', err);
    return null;
  }
}
