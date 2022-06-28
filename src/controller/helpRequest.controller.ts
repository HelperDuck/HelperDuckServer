import { Request, Response } from 'express';
import { HelpRequest, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import model from '../model/index';

//Requests related functions

export async function getAllRequests(req: Request, res: Response) {
  const requests = await model.request.getAllRequests();
  if (!requests) return res.status(400).send('Error getting requests');
  return res.status(200).send(requests);
}

export async function getRequestById(req: Request, res: Response) {
  const id: number = parseInt(req.params.id);
  if (!id) return res.status(400).send('No id provided');
  const request = await model.request.getRequestById(id);
  if (!request) return res.status(404).send('Request not found');
  return res.status(200).send(request);
}

export async function createRequest(req: Request, res: Response) {
  const requestData: any = req.body;

  if (!requestData.userId || !requestData.subject)
    return res.status(400).send('No userId or subject provided');

  const user = await model.user.findUniqueUser({
    id: requestData.userId,
    uid: requestData.uid,
    email: requestData.email,
    userName: requestData.userName,
  });
  if (!user) return res.status(404).send('User not found');

  //Because these are nested they need to be removed before updating
  const helRequestUnnested = req.body;
  const technologies = helRequestUnnested.technologies;
  const languages = helRequestUnnested.languages;
  delete helRequestUnnested.technologies;
  delete helRequestUnnested.languages;

  const helpRequestCreated = await model.request.createHelpRequest(
    helRequestUnnested
  );
  if (!helpRequestCreated)
    return res.status(400).send('Error creating request');

  //Update technologies
  if (technologies) {
    const technologiesAdded =
      await model.technology.createHelpRequestToTechnologies(
        helpRequestCreated.id,
        technologies
      );
    if (!technologiesAdded)
      return res.status(400).send('Error adding technologies');
  }

  //TODO Update languages
  if (languages) {
    const languagesAdded = await model.language.createHelpRequestToLanguages(
      helpRequestCreated.id,
      languages
    );
    if (!languagesAdded) return res.status(400).send('Error adding languages');
  }

  const helpRequestComplete = await model.request.getRequestById(
    helpRequestCreated.id
  );
  if (!helpRequestComplete)
    return res.status(400).send('Error getting newly created HelpRequest');
  return res.status(200).send(helpRequestComplete);
}
