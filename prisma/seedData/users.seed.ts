import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
const userData: Prisma.UserCreateInput[] = [
  {
    uid: 'test',
    userName: 'test',
    email: 'test@test.test',
    firstName: 'Test',
    lastName: 'Test',
    userBio: 'TestUser',
    gitHubProfile: 'TestingTheTest',
    technologies: {
      create: [
        { technology: { connect: { name: 'Java' } } },
        { technology: { connect: { name: 'Python' } } },
      ],
    },
    languages: {
      create: [{ language: { connect: { code: 'en' } } }],
    },
  },
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
  {
    uid: 'AfAM70bjo9MHY8bzzD1DIeDhNxP2',
    userName: 'Noel',
    email: 'Noel@awesome.kf',
    firstName: 'Noel',
    lastName: 'guiavieira',
    userBio: 'Socket guru',
    gitHubProfile: 'Noel',
    technologies: {
      create: [
        { technology: { connect: { name: 'JavaScript' } } },
        { technology: { connect: { name: 'Express' } } },
      ],
    },
    languages: {
      create: [
        { language: { connect: { code: 'en' } } },
        { language: { connect: { code: 'es' } } },
      ],
    },
  },
  {
    uid: 'zTFzj6Ps4CXpTUbfaylHwnHL7jv2',
    userName: 'fegananca',
    email: 'fegananca@gmail.com',
    firstName: 'Fernanda',
    lastName: 'Ganança',
    userBio: 'Trying to be a nerd',
    gitHubProfile: 'fegananca',
    technologies: {
      create: [
        { technology: { connect: { name: 'JavaScript' } } },
        { technology: { connect: { name: 'Express' } } },
        { technology: { connect: { name: 'React' } } },
      ],
    },
    languages: {
      create: [
        { language: { connect: { code: 'en' } } },
        { language: { connect: { code: 'es' } } },
        { language: { connect: { code: 'pt' } } },
      ],
    },
  },
  {
    uid: 'eZhAcxMeGnahj6Q8xidUaPQ3a933',
    userName: 'MauSca',
    email: 'scainmauricio@gmail.com',
    firstName: 'Mauricio',
    lastName: 'Scain',
    userBio: '72 years old dev',
    gitHubProfile: 'https://github.com/scainMauricio',
    technologies: {
      create: [
        { technology: { connect: { name: 'JavaScript' } } },
        { technology: { connect: { name: 'React' } } },
      ],
    },
    languages: {
      create: [
        { language: { connect: { code: 'en' } } },
        { language: { connect: { code: 'pt' } } },
      ],
    },
  },
  {
    uid: 'test2',
    userName: 'test2',
    email: 'test@test.test2',
    firstName: 'Test2',
    lastName: 'Test2',
    userBio: 'TestUser2',
    gitHubProfile: 'TestingTheTest2',
    technologies: {
      create: [{ technology: { connect: { name: 'Atom' } } }],
    },
    languages: {
      create: [{ language: { connect: { code: 'en' } } }],
    },
  },
  {
    uid: 'test3',
    userName: 'test3',
    email: 'test@test.test3',
    firstName: 'Test2',
    lastName: 'Test2',
    userBio: 'TestUser2',
    gitHubProfile: 'TestingTheTest2',
    technologies: {
      create: [{ technology: { connect: { name: 'Atom' } } }],
    },
    languages: {
      create: [{ language: { connect: { code: 'en' } } }],
    },
  },
  {
    uid: 'test4',
    userName: 'test4',
    email: 'test@test.test4',
    firstName: 'Test2',
    lastName: 'Test2',
    userBio: 'TestUser2',
    gitHubProfile: 'TestingTheTest2',
    technologies: {
      create: [{ technology: { connect: { name: 'Atom' } } }],
    },
    languages: {
      create: [{ language: { connect: { code: 'en' } } }],
    },
  },
  {
    uid: 'test5',
    userName: 'test5',
    email: 'test@test.test5',
    firstName: 'Test5',
    lastName: 'Test2',
    userBio: 'TestUser2',
    gitHubProfile: 'TestingTheTest2',
    technologies: {
      create: [{ technology: { connect: { name: 'Atom' } } }],
    },
    languages: {
      create: [{ language: { connect: { code: 'en' } } }],
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
