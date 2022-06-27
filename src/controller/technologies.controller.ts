import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllProgramLang(req: Request, res: Response) {
  try {
    const allProgramLang = await prisma.technology.findMany();
    res.send(allProgramLang);
  } catch (err) {
    console.log('Error at getAllTechnologies Controller', err);
    res.sendStatus(400);
  }
}

export async function updateUserTechnologies(req: Request, res: Response) {
  console.log('started updateUserTechnologies');
  try {
    const uid = req.params.uid;
    const technologies = req.body.technologies;

    const user = await prisma.user.findUnique({
      where: {
        uid: uid,
      },
    });

    if (!user) return res.status(404).send('User not found');

    await prisma.usersToTechnologies.deleteMany({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    const technologiesUpdated = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        technologies: {
          create: technologies.map((tech: any) => {
            return { technology: { connect: { name: tech.technology.name } } };
          }),
        },
      },
    });

    res.send(technologiesUpdated);
  } catch (err) {
    console.log('Error at updateTechnologies Controller', err);
    res.sendStatus(400);
  }
}
