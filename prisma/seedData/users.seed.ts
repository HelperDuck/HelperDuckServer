import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
const userData: Prisma.UserCreateInput[] = [
  {
    uid: 'jcLzJnBP2mZnKA53NhpYmp3gpkl1',
    userName: 'Siebe',
    email: 'siebe.kylstra@gmail.com',
    firstName: 'Siebe',
    lastName: 'Kylstra',
    userBio: 'DevOps nerd',
    gitHubProfile: 'siebekylstra',
    technologies: {
      create: [
        { technology: { connect: { name: 'Java' } } },
        { technology: { connect: { name: 'Python' } } },
      ],
    },
    languages: {
      create: [
        { language: { connect: { code: 'en' } } },
        { language: { connect: { code: 'nl' } } },
      ],
    },
  },
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
