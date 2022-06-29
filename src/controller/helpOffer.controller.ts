import { Request, Response } from 'express';
import model from '../model/index';

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
  const helpOfferData: any = req.body;

  if (!helpOfferData.userId || !helpOfferData.subject)
    return res.status(400).send('No userId or subject provided');
}
