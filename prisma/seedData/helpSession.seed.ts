import { PrismaClient, Prisma } from '@prisma/client';
import moment from 'moment';

const prisma = new PrismaClient();

function generateInput(userId: number): Prisma.HelpSessionCreateInput[] {
  return [
    {
      // startTime: moment().subtract(30, 'minutes').toDate(),
      // endTime: moment().add(0, 'minutes').toDate(),
      duration: 30,
      status: 'closed',
      tipGiven: 5.0,
      // helpRequest: {
      //   create: {
      //     user: { connect: { id: userId } },
      //     status: 'closed',
      //     subject: 'how to start a mac',
      //     description: 'I need some help with this',
      //     codeSnippet: 'console.log(helloWorld)',
      //     linkToSandbox: 'https://codesandbox.io/s/rlkjz2n43q',
      //     roomId: 'testRoom',
      //     technologies: {
      //       create: [
      //         { technology: { connect: { name: 'Java' } } },
      //         { technology: { connect: { name: 'Python' } } },
      //       ],
      //     },
      //     languages: {
      //       create: [{ language: { connect: { code: 'en' } } }],
      //     },
      //     helpOffers: {
      //       create: [
      //         {
      //           user: { connect: { id: userId + 1 } },
      //           status: 'accepted',
      //         },
      //       ],
      //     },
      //   },
      // },
      reviews: {
        create: [
          {
            user: { connect: { id: userId } },
            role: 'Requester',
            rating: 3,
            text: 'Really was open to feedback',
          },
          {
            user: { connect: { id: userId + 1 } },
            role: 'Solver',
            rating: 5,
            text: 'Great help',
          },
        ],
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

export async function seedHelpSessions() {
  console.log(`Start seeding helpSessions`);

  const data = generateForAllUsers();
  for (const r of data) {
    const request = await prisma.helpSession.create({
      data: r,
    });
    console.log(`Created helpSession with id: ${request.id}`);
  }
  console.log(`Seeding helpSessions finished.`);
}
