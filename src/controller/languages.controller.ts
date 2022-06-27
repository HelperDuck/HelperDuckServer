import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllLanguages(req: Request, res: Response) {
  try {
    const allLanguages = await prisma.language.findMany();
    res.send(allLanguages);
  } catch (err) {
    console.log('Error at getAllLanguages Controller', err);
    res.sendStatus(400);
  }
}
