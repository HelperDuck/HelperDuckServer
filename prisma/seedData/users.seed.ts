import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
const userData: Prisma.UserCreateInput[] = [
  {
    first_name: 'Alice',
    last_name: 'in Testland',
    email: 'alice@prisma.io',
    programLangs: {
      create: [{ programLang: { connect: { name: 'Java' } } }],
    },
    posts: {
      create: [
        {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: true,
        },
      ],
    },
  },
  {
    first_name: 'Nilu',
    last_name: 'The Man',
    email: 'nilu@prisma.io',
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
          published: true,
          viewCount: 42,
        },
      ],
    },
  },
  {
    first_name: 'Mahmoud',
    last_name: 'The Female',
    email: 'mahmoud@prisma.io',
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
          viewCount: 128,
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
        },
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
