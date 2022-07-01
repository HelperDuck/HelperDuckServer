import { HelpOffer } from '@prisma/client';
import { Request, Response } from 'express';
import model from '../model/index.models';

//HelpOffer related functions
export async function getAllHelpOffers(req: Request, res: Response) {
  const helpOffers = await model.helpOffer.getAllHelpOffers();
  if (!helpOffers) return res.status(400).send('Error getting helpOffers');
  return res.status(200).send(helpOffers);
}

export async function getHelpOfferById(req: Request, res: Response) {
  const id: number = parseInt(req.params.id);
  if (!id) return res.status(400).send('No id provided');
  const helpOffer = await model.helpOffer.getHelpOfferById(id);
  if (!helpOffer) return res.status(404).send('HelpOffer not found');
  return res.status(200).send(helpOffer);
}

export async function createHelpOffer(req: Request, res: Response) {
  const helpRequestId = parseInt(req.params.helpRequestId);
  if (!helpRequestId) return res.status(400).send('No helpRequestId provided');

  const helpOfferData: any = req.body;
  helpOfferData.helpRequestId = helpRequestId;

  if (!helpOfferData.userId) return res.status(400).send('No userId provided that will create the helpOffer');

  const user = await model.user.findUniqueUser({ id: helpOfferData.userId });
  if (!user) return res.status(404).send('User not found');

  const helpRequest = await model.helpRequest.getHelpRequestById(helpRequestId);
  if (!helpRequest) return res.status(404).send('HelpRequest not found');

  //Check if user is already helping
  const helpOfferExists = helpRequest.helpOffers.filter((helpOffer) => helpOffer.userId === user.id);

  if (helpOfferExists.length > 0)
    return res.status(400).send({
      errorMessage: 'user already send helpOffer',
      helpOffer: helpOfferExists,
    });

  const createdHelpOffer = await model.helpOffer.createHelpOffer(helpOfferData);
  if (!createdHelpOffer) return res.status(400).send('Error creating helpOffer');

  return res.status(200).send(createdHelpOffer);
}

export async function acceptHelpOffer(req: Request, res: Response) {
  req.body.status = 'accepted';
  updateHelpOffer(req, res);
}

export async function declineHelpOffer(req: Request, res: Response) {
  req.body.status = 'declined';
  updateHelpOffer(req, res);
}

export async function updateHelpOffer(req: Request, res: Response) {
  const helpRequestId = parseInt(req.params.helpRequestId);
  if (!helpRequestId) return res.status(400).send('No helpRequestId provided');

  const helpOfferId = parseInt(req.params.helpOfferId);
  if (!helpOfferId) return res.status(400).send('No helpOfferId provided');

  const helpOffer = await model.helpOffer.getHelpOfferById(helpOfferId);
  if (!helpOffer) return res.status(404).send('HelpOffer not found');

  const helpOfferUpdateData = { status: req.body.status };

  if (helpOffer.helpRequestId !== helpRequestId)
    return res.status(400).send('HelpOffer does not belong to this helpRequest');

  const updatedHelpOffer = await model.helpOffer.updateHelpOffer(helpOffer.id, helpOfferUpdateData);
  if (!updatedHelpOffer) return res.status(400).send('Error accepting helpOffer');

  return res.status(200).send(updatedHelpOffer);
}

export async function findHelpOffers(req: Request, res: Response) {
  const searchData: {
    technologies?: string;
    userUid?: string;
    userName?: string;
    userId?: string;
    status?: string;
    searchType?: string;
  } = req.query;

  if (Object.keys(searchData).length === 0) {
    return res.status(400).send('No query provided. Please provide at least one search parameter');
  }

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
    status: searchData.status ? searchData.status : 'solved',
  };

  //TODO change into dynamic search for now only AND statement is implemented
  // const searchType: string = searchData.searchType === 'AND' ? searchData.searchType : 'OR';
  const searchType: string = 'AND';

  // let foundHelpOffer: HelpOffer[] | null;
  let foundHelpOffers: HelpOffer[] | null;

  //SEARCH BY USER if any of those are provided
  if (search.userId || search.userUid || search.userName) {
    const user = await model.user.findUniqueUser({
      id: search.userId,
      uid: search.userUid,
      userName: search.userName,
    });

    if (!user) return res.status(404).send('User not found');

    foundHelpOffers = await model.helpOffer.findHelpOffersByUserId(user.id, { status: searchData.status });
    if (!foundHelpOffers) return res.status(404).send('No helpOffers found');
    return res.status(200).send(foundHelpOffers);
  }

  return res.status(400).send('Not implemented yet, only searchable by user');
}
