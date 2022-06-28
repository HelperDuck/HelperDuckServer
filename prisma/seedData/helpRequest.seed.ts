import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const requestData: Prisma.HelpRequestCreateInput[] = [
  {
    user: { connect: { id: 1 } },
    status: 'open',
    subject: 'center a div',
    description: 'I need some help with this',
    codeSnippet: 'console.log(helloWorld)',
    linkToSandbox: 'https://codesandbox.io/s/rlkjz2n43q',
    roomId: 'testRoom',
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
    user: { connect: { id: 1 } },
    status: 'closed',
    subject: 'how to start a pc',
    description: 'I need some help with this',
    technologies: {
      create: [
        { technology: { connect: { name: 'JavaScript' } } },
        { technology: { connect: { name: 'Python' } } },
      ],
    },
    languages: {
      create: [{ language: { connect: { code: 'en' } } }],
    },
  },
  {
    user: { connect: { id: 1 } },
    status: 'canceled',
    subject: 'how to start a pc',
    description: 'I need some help with this',
    technologies: {
      create: [
        { technology: { connect: { name: 'JavaScript' } } },
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
    const request = await prisma.helpRequest.create({
      data: r,
    });
    console.log(`Created request with id: ${request.id}`);
  }
  console.log(`Seeding requests finished.`);
}
