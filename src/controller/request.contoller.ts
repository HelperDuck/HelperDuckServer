import { Request, Response } from 'express';
import model from '../model/index';

//Requests related functions

export async function getAllRequests(req: Request, res: Response) {
  // const requests = await model.request.getAllRequests();
  const requests = undefined;
  if (!requests) return res.status(400).send('Error getting requests');
  return res.status(200).send(requests);
}
