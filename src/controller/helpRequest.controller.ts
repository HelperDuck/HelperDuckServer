import { HelpRequest } from '@prisma/client';
import { Request, Response } from 'express';
import model from '../model/index.models';
import { Decimal } from '@prisma/client/runtime';

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

  if (!requestData.userId || !requestData.subject) return res.status(400).send('No userId or subject provided');

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

  const helpRequestCreated = await model.helpRequest.createHelpRequest(helpRequestUnnested);
  if (!helpRequestCreated) return res.status(400).send('Error creating request');

  //Insert technologies
  if (technologies) {
    const technologiesAdded = await model.technology.createHelpRequestToTechnologies(
      helpRequestCreated.id,
      technologies
    );
    if (!technologiesAdded) return res.status(400).send('Error adding technologies');
  }

  //Insert languages
  if (languages) {
    const languagesAdded = await model.language.createHelpRequestToLanguages(helpRequestCreated.id, languages);
    if (!languagesAdded) return res.status(400).send('Error adding languages');
  }

  const helpRequestComplete = await model.helpRequest.getHelpRequestById(helpRequestCreated.id);
  if (!helpRequestComplete) return res.status(400).send('Error getting newly created HelpRequest');
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

  //we need to delete the technologies and languages first
  const helpRequestUnnested = request;
  const technologies = helpRequestUnnested.technologies;
  const languages = helpRequestUnnested.languages;

  if (technologies) {
    const technologiesDeleted = await model.technology.deleteHelpRequestFromTechnologies(helpRequestUnnested.id);
    if (!technologiesDeleted) return res.status(400).send('Error deleting technologies');
  }

  if (languages) {
    const languagesDeleted = await model.language.deleteHelpRequestFromLanguages(helpRequestUnnested.id);
    if (!languagesDeleted) return res.status(400).send('Error deleting languages');
  }

  const deleted = await model.helpRequest.deleteHelpRequest(helpRequestId);
  if (!deleted) return res.status(400).send('Error deleting request');
  return res.status(200).send(deleted);
}

export async function findHelpRequests(req: Request, res: Response) {
  const searchData: {
    technologies?: string;
    userUid?: string;
    userName?: string;
    userId?: string;
    status?: string;
    searchType?: string;
  } = req.query;

  if (Object.keys(searchData).length === 0)
    return res
      .status(400)
      .send(
        'No searchValues were provided, please use one of these: helpRequestId, technologies, userUid, userName, userId'
      );

  const search: {
    technologies: string[];
    userUid: string;
    userName: string;
    userId: number;
    status: string;
  } = {
    technologies: searchData.technologies ? searchData.technologies.replace(/\s/g, '').split(',') : [],
    userUid: searchData.userUid ? searchData.userUid : '',
    userName: searchData.userName ? searchData.userName : '',
    userId: searchData.userId ? parseInt(searchData.userId) : 0,
    status: searchData.status ? searchData.status : 'open',
  };

  const searchType: string = searchData.searchType === 'AND' ? searchData.searchType : 'OR';

  let foundHelpRequests: HelpRequest[] | null;

  if (searchType === 'OR') {
    foundHelpRequests = await model.helpRequest.findHelpRequestsOR(search);
  } else {
    foundHelpRequests = await model.helpRequest.findHelpRequestsAND(search);
  }

  if (!foundHelpRequests) return res.status(400).send('Error finding requests');
  if (foundHelpRequests.length === 0) return res.status(404).send('No requests found');

  return res.status(200).send(foundHelpRequests);
}

export async function solvedHelpRequest(req: Request, res: Response) {
  const helpRequestId: number = parseInt(req.params.helpRequestId);
  const helpOfferId: number = parseInt(req.params.helpOfferId);
  if (!helpRequestId || !helpOfferId) return res.status(400).send('No helpRequestId / helpOfferId provided');

  const helpRequest = await model.helpRequest.getHelpRequestById(helpRequestId);
  const helpOffer = await model.helpOffer.getHelpOfferById(helpOfferId);
  if (!helpRequest || !helpOffer) return res.status(404).send('Request / HelpOffer not found');

  if (helpRequest.status !== 'open') return res.status(400).send('Request is not open');
  if (helpOffer.status !== 'open' && helpOffer.status !== 'accepted')
    return res.status(400).send('HelpOffer is not open');
  if (helpRequest.id !== helpOffer.helpRequestId) {
    return res.status(400).send('HelpOffer does not belong to this request');
  }

  const tip = req.body.tipGiven ? req.body.tipGiven : 0;

  const helpRequestUpdateData = {
    status: 'solved',
    tipGiven: tip,
  };

  if (req.body.review) {
    const helpOfferReviewData = {
      rating: req.body.review.rating,
      comment: req.body.review.comment,
      helpOfferId: helpOfferId,
      helpRequestId: helpRequestId,
      userId: helpOffer.userId,
      role: 'helpGiver',
    };

    const helpOfferReview = await model.helpReview.createHelpOfferReview(helpOfferReviewData);
    if (!helpOfferReview) return res.status(400).send('Error creating helpOfferReview');
  }

  const helpOfferUpdateData = {
    status: 'solved',
    tipReceived: tip,
  };

  const helpRequestUpdated = await model.helpRequest.updateHelpRequest(helpRequest.id, helpRequestUpdateData);
  if (!helpRequestUpdated) return res.status(400).send('Error updating request');

  const helpOfferUpdated = await model.helpOffer.updateHelpOffer(helpOffer.id, helpOfferUpdateData);
  if (!helpOfferUpdated) return res.status(400).send('Error updating offer');

  //edits credits of users
  //HelpAsker
  if (!helpRequest.user || !helpOffer.user) return res.status(400).send('Error updating credits');
  const helpAsker = await model.user.changeCredits(helpRequest.user, { tipsGiven: tip });
  if (!helpAsker) return res.status(400).send('Error updating credits');
  //HelpGiver
  const helpGiver = await model.user.changeCredits(helpOffer.user, { tipsReceived: tip });
  if (!helpGiver) return res.status(400).send('Error updating credits');

  const helpRequestComplete = await model.helpRequest.getHelpRequestById(helpRequest.id);

  return res.status(200).send(helpRequestComplete);
}
