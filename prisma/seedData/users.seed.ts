import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
const userData: Prisma.UserCreateInput[] = [
  // {
  //   uid: 'jcLzJnBP2mZnKA53NhpYmp3gpkl1',
  //   userName: 'Siebe',
  //   email
  //   firstName
  //   lastName
  //   bio
  //   githubUsername
  //   pictureUrl
  //   createdAt
  //   updatedAt
  //   programLangs
  //   languages
  //   programLangs: {
  //     create: [{ programLang: { connect: { name: 'Java' } } }],
  //   },
  // },
];

export async function seedUsers() {
  console.log(`Start seeding users`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding users finished.`);
}
