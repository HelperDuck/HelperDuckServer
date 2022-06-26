import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllprogramLang(req: Request, res: Response) {
  try {
    const allProgramLang = await prisma.programLang.findMany();
    res.send(allProgramLang);
  } catch (err) {
    console.log('Error at getAllProgramLang Controller', err);
    res.sendStatus(400);
  }
}
