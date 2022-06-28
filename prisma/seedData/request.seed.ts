import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const requestData: Prisma.RequestCreateInput[] = [
  {
    user: { connect: { id: 1 } },
    status: 'open',
    subject: 'center a div',
    description: 'I need some help with this',
    codeSnippet: 'console.log(helloWorld)',
    linkToSandbox: 'https://codesandbox.io/s/rlkjz2n43q',
    roomId: 'xSXDffaf23567',
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
];

export async function seedRequests() {
  console.log(`Start seeding requests`);
  for (const r of requestData) {
    const request = await prisma.request.create({
      data: r,
    });
    console.log(`Created request with id: ${request.id}`);
  }
  console.log(`Seeding requests finished.`);
}
