import { Request, Response } from 'express';
import model from '../model/index.models';

//helpRequests related functions

export async function getAllHelpRequests(req: Request, res: Response) {
  const requests = await model.helpRequest.getAllHelpRequests();
  if (!requests) return res.status(400).send('Error getting requests');
  return res.status(200).send(requests);
}

export async function getHelpRequestById(req: Request, res: Response) {
  const id: number = parseInt(req.params.id);
  if (!id) return res.status(400).send('No id provided');
  const request = await model.helpRequest.getHelpRequestById(id);
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

  const helpRequestCreated = await model.helpRequest.createHelpRequest(
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

  const helpRequestComplete = await model.helpRequest.getHelpRequestById(
    helpRequestCreated.id
  );
  if (!helpRequestComplete)
    return res.status(400).send('Error getting newly created HelpRequest');
  return res.status(200).send(helpRequestComplete);
}

export async function deleteHelpRequest(req: Request, res: Response) {
  let helpRequestIdObject = req.query.helpRequestId;
  if (!helpRequestIdObject || typeof helpRequestIdObject !== 'string')
    return res.status(400).send('No helpRequestId provided');

  const helpRequestId = parseInt(helpRequestIdObject);
  if (!helpRequestId) return res.status(400).send('HelpRequest was not a int');

  const request = await model.helpRequest.getHelpRequestById(helpRequestId);
  if (!request) return res.status(404).send('Request not found');

  const deleted = await model.helpRequest.deleteHelpRequest(helpRequestId);
  if (!deleted) return res.status(400).send('Error deleting request');
  return res.status(200).send(deleted);
}

export async function findHelpRequests(req: Request, res: Response) {
  const searchData: {
    helpRequestId?: string;
    technologies?: string;
    userUid?: string;
    userName?: string;
    userId?: string;
    status?: string;
  } = req.query;
  //  ;

  console.log(searchData);

  if (Object.keys(searchData).length === 0)
    return res
      .status(400)
      .send(
        'No searchValues were provided, please use one of these: helpRequestId, technologies, userUid, userName, userId'
      );

  const search: {
    helpRequestId: number;
    technologies: string[];
    userUid: string;
    userName: string;
    userId: number;
    status: string;
  } = {
    helpRequestId: searchData.helpRequestId
      ? parseInt(searchData.helpRequestId)
      : 0,
    technologies: searchData.technologies
      ? searchData.technologies.split(',')
      : [],
    userUid: searchData.userUid ? searchData.userUid : '',
    userName: searchData.userName ? searchData.userName : '',
    userId: searchData.userId ? parseInt(searchData.userId) : 0,
    status: searchData.status ? searchData.status : '',
  };

  const foundHelpRequests = await model.helpRequest.findHelpRequests(search);
  if (!foundHelpRequests) return res.status(400).send('Error finding requests');
  if (foundHelpRequests.length === 0)
    return res.status(404).send('No requests found');

  return res.status(200).send(foundHelpRequests);
}
