import { PrismaClient, Prisma } from '@prisma/client';
import { v4 } from 'uuid';

const prisma = new PrismaClient();

function generateInput(userId: number): Prisma.HelpRequestCreateInput[] {
  return [
    {
      user: { connect: { id: userId } },
      status: 'solved',
      subject: 'center a div',
      description: 'I need some help with this',
      codeSnippet: 'console.log(helloWorld)',
      linkToSandbox: 'https://codesandbox.io/s/rlkjz2n43q',
      roomId: v4(),
      tipGiven: 5,
      technologies: {
        create: [{ technology: { connect: { name: 'Java' } } }, { technology: { connect: { name: 'Python' } } }],
      },
      languages: {
        create: [{ language: { connect: { code: 'en' } } }],
      },
      helpOffers: {
        create: [
          {
            user: { connect: { id: userId + 1 } },
            status: 'accepted',
            tipReceived: 5,
            review: {
              create: {
                rating: 5,
                comment: 'This is a good help session',
                user: { connect: { id: userId + 1 } },
              },
            },
          },
          {
            user: { connect: { id: userId + 2 } },
            status: 'open',
          },
          {
            user: { connect: { id: userId + 3 } },
            status: 'declined',
          },
        ],
      },
    },
    {
      user: { connect: { id: userId } },
      status: 'open',
      subject: 'center a div',
      description: 'I need some help with this',
      codeSnippet: 'console.log(helloWorld)',
      linkToSandbox: 'https://codesandbox.io/s/rlkjz2n43q',
      roomId: v4(),
      technologies: {
        create: [{ technology: { connect: { name: 'Java' } } }, { technology: { connect: { name: 'Python' } } }],
      },
      languages: {
        create: [{ language: { connect: { code: 'en' } } }],
      },
      helpOffers: {
        create: [
          {
            user: { connect: { id: userId + 2 } },
            status: 'open',
          },
          {
            user: { connect: { id: userId + 1 } },
            status: 'declined',
          },
        ],
      },
    },
    {
      user: { connect: { id: userId } },
      status: 'closed',
      subject: 'how to start a pc',
      description: 'I need some help with this',
      technologies: {
        create: [{ technology: { connect: { name: 'JavaScript' } } }, { technology: { connect: { name: 'Python' } } }],
      },
      languages: {
        create: [{ language: { connect: { code: 'en' } } }],
      },
    },
    {
      user: { connect: { id: userId } },
      status: 'accepted',
      subject: 'how to start a pc',
      description: 'I need some help with this',
      roomId: v4(),
      technologies: {
        create: [{ technology: { connect: { name: 'JavaScript' } } }, { technology: { connect: { name: 'Python' } } }],
      },
      languages: {
        create: [{ language: { connect: { code: 'en' } } }],
      },
    },
    {
      user: { connect: { id: userId } },
      status: 'canceled',
      subject: 'how to start a pc',
      description: 'I need some help with this',
      technologies: {
        create: [{ technology: { connect: { name: 'JavaScript' } } }, { technology: { connect: { name: 'Python' } } }],
      },
      languages: {
        create: [{ language: { connect: { code: 'en' } } }],
      },
    },
  ];
}

function generateForAllUsers() {
  let dataForAllUsers: any[] = [];
  for (let i = 1; i <= 3; i++) {
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
