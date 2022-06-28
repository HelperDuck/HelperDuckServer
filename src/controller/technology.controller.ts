import { Request, Response } from 'express';
import model from '../model/index';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllProgramLang(req: Request, res: Response) {
  const allTechnologies = await model.technology.getAllTechnologies();
  if (!allTechnologies) return res.status(404).send('No technologies found');
  res.send(allTechnologies);
}

export async function updateUserTechnologies(req: Request, res: Response) {
  const uid = req.params.uid;
  if (!uid) return res.status(400).send('No uid provided');

  const user = await model.user.findUniqueUser({ uid });
  if (!user) return res.status(404).send('User not found');

  const deletedTech = await model.technology.deleteUsersToTechnologies(user.id);
  if (!deletedTech) return res.status(400).send('Error deleting technologies');

  const newTech = await model.technology.createUsersToTechnologies(
    req.body.technologies,
    user.id
  );
  if (!newTech) return res.status(400).send('Error creating technologies');

  const newUserData = await model.user.findUserComplete(uid);

  return res.status(200).send(newUserData);
}
