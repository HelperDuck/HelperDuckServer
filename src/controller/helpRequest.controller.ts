import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import model from '../model/index';

//Requests related functions

export async function getAllRequests(req: Request, res: Response) {
  const requests = await model.request.getAllRequests();
  if (!requests) return res.status(400).send('Error getting requests');
  return res.status(200).send(requests);
}

// export async function createRequest(req: Request, res: Response) {
//   const {userId, subject, status, description, codeSnippet, linkToSandbox, roomId }:Request = req.body;
//   if (!userId || !subject) return res.status(400).send('No userId or subject provided');

//   const requestData = {userId, subject, status, description, codeSnippet, linkToSandbox, roomId};
//   const request = await model.request.createRequest(requestData);
// }
