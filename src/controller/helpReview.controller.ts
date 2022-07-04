import { HelpRequest } from '@prisma/client';
import { Request, Response } from 'express';
import model from '../model/index.models';

export async function getallHelpReviews(req: Request, res: Response) {
  const requests = await model.helpReview.getAllHelpReviews();
  if (!requests) return res.status(400).send('Error getting requests');
  return res.status(200).send(requests);
}

export async function createHelpReview(req: Request, res: Response) {
  const reviewData: {
    rating: string;
    comment: string;
    userId: string;
    role: string;
    helpOfferId?: string;
    helpRequestId?: string;
  } = req.body;

  if (!reviewData.helpOfferId && !reviewData.helpRequestId) {
    return res.status(400).send('Please provide either helpOfferId or helpRequestId');
  }

  if (reviewData.helpOfferId && reviewData.helpRequestId) {
    return res.status(400).send('Please provide either helpOfferId or helpRequestId but not both');
  }

  if (!reviewData.userId) return res.status(400).send('Please provide userId');
  if (!reviewData.rating) return res.status(400).send('Please provide rating');

  //Checks if objects are valid
  if (reviewData.helpRequestId) {
    const helpRequest = await model.helpRequest.getHelpRequestById(parseInt(reviewData.helpRequestId));
    if (!helpRequest) return res.status(404).send('HelpOffer not found');
  }

  let helpOffer: any;
  if (reviewData.helpOfferId) {
    helpOffer = await model.helpOffer.getHelpOfferById(parseInt(reviewData.helpOfferId));
    if (!helpOffer) return res.status(404).send('HelpOffer not found');
  }

  const user = await model.user.findUniqueUser({ id: parseInt(reviewData.userId) });
  if (!user) return res.status(404).send('User not found');

  let createdReview: any;
  if (reviewData.helpRequestId) {
    reviewData.role = 'helpAsker';
    createdReview = await createHelpRequestReview(reviewData);
  } else if (reviewData.helpOfferId) {
    reviewData.role = 'helpGiver';
    reviewData.helpRequestId = helpOffer.helpRequestId;
    createdReview = await createHelpOfferReview(reviewData);
  }

  if (!createdReview) return res.status(400).send('Error creating review');
  return res.status(200).send(createdReview);
}

async function createHelpRequestReview(reviewData: {
  rating: string;
  comment: string;
  role: string;
  userId: string;
  helpRequestId?: string;
}) {
  if (!reviewData.helpRequestId) return null;
  const helpRequest = await model.helpRequest.getHelpRequestById(parseInt(reviewData.helpRequestId));
  if (!helpRequest) return null;

  const review = await model.helpReview.createHelpRequestReview(reviewData);
  if (!review) return null;

  return review;
}

async function createHelpOfferReview(reviewData: {
  rating: string;
  comment: string;
  role: string;
  userId: string;
  helpOfferId?: string;
  helpRequestId?: string;
}) {
  if (!reviewData.helpOfferId) return null;
  const helpRequest = await model.helpOffer.getHelpOfferById(parseInt(reviewData.helpOfferId));
  if (!helpRequest) return null;

  const review = await model.helpReview.createHelpOfferReview(reviewData);
  if (!review) return null;

  return review;
}
