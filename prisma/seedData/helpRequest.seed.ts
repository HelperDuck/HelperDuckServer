import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

function generateInput(userId: number): Prisma.HelpRequestCreateInput[] {
  return [
    {
      user: { connect: { id: userId + 1 } },
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
      user: { connect: { id: userId + 1 } },
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
      user: { connect: { id: userId + 1 } },
      status: 'accepted',
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
      user: { connect: { id: userId + 1 } },
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
}

function generateForAllUsers() {
  let dataForAllUsers: any[] = [];
  for (let i = 0; i <= 5; i++) {
    const input = [...generateInput(i)];
    dataForAllUsers.push(...input);
  }
  return dataForAllUsers;
}

export async function seedHelpRequests() {
  console.log(`Start seeding HelpRequests`);

  const helpRequestData = generateForAllUsers();
  for (const r of helpRequestData) {
    const request = await prisma.helpRequest.create({
      data: r,
    });
    console.log(`Created helpRequest with id: ${request.id}`);
  }
  console.log(`Seeding helpRequests finished.`);
}
