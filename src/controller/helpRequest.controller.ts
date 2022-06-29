import { Request, Response } from 'express';
import model from '../model/index';

//Requests related functions

export async function getAllHelpRequests(req: Request, res: Response) {
  const requests = await model.request.getAllHelpRequests();
  if (!requests) return res.status(400).send('Error getting requests');
  return res.status(200).send(requests);
}

export async function getHelpRequestById(req: Request, res: Response) {
  const id: number = parseInt(req.params.id);
  if (!id) return res.status(400).send('No id provided');
  const request = await model.request.getHelpRequestById(id);
  if (!request) return res.status(404).send('Request not found');
  return res.status(200).send(request);
}

export async function createHelpRequest(req: Request, res: Response) {
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
  const helpRequestUnnested = req.body;
  const technologies = helpRequestUnnested.technologies;
  const languages = helpRequestUnnested.languages;
  delete helpRequestUnnested.technologies;
  delete helpRequestUnnested.languages;

  const helpRequestCreated = await model.request.createHelpRequest(
    helpRequestUnnested
  );
  if (!helpRequestCreated)
    return res.status(400).send('Error creating request');

  //Insert technologies
  if (technologies) {
    const technologiesAdded =
      await model.technology.createHelpRequestToTechnologies(
        helpRequestCreated.id,
        technologies
      );
    if (!technologiesAdded)
      return res.status(400).send('Error adding technologies');
  }

  //Insert languages
  if (languages) {
    const languagesAdded = await model.language.createHelpRequestToLanguages(
      helpRequestCreated.id,
      languages
    );
    if (!languagesAdded) return res.status(400).send('Error adding languages');
  }

  const helpRequestComplete = await model.request.getHelpRequestById(
    helpRequestCreated.id
  );
  if (!helpRequestComplete)
    return res.status(400).send('Error getting newly created HelpRequest');
  return res.status(200).send(helpRequestComplete);
}
