import { PrismaClient, User } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
const prisma = new PrismaClient();

export async function findUniqueUser({
  uid,
  email,
  userName,
  id,
}: {
  uid?: string;
  email?: string;
  userName?: string;
  id?: number;
}) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ uid: uid }, { userName: userName }, { email: email }, { id: id }],
      },
      // include: {
      //   helpRequests: true,
      //   helpOffers: true,
      // },
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
        helpOffers: { include: { reviews: true } },
        helpRequests: true,
        reviews: true,
      },
    });

    return user;
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

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (err) {
    console.log('Error at Model-getAllUsers', err);
    return null;
  }
}

export async function changeCredits(
  user: User,
  mutation: { tipsReceived?: Decimal; tipsGiven?: Decimal; creditsBought?: Decimal }
) {
  try {
    const creditsBought = mutation.creditsBought || new Decimal(0);
    const tipsReceived = mutation.tipsReceived || new Decimal(0);
    const tipsGiven = mutation.tipsGiven || new Decimal(0);

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        credits: new Decimal(user.credits).add(creditsBought).add(tipsReceived).minus(tipsGiven),
        tipsReceived: new Decimal(user.tipsReceived).add(tipsReceived),
        tipsGiven: new Decimal(user.tipsGiven).add(tipsGiven),
      },
    });

    return updatedUser;
  } catch (err) {
    console.log('Error at Model-changeCredits', err);
    return null;
  }
}
