import { Request, Response } from 'express';
import model from '../model/index';

export async function getAllLanguages(req: Request, res: Response) {
  const allLanguages = await model.language.getAllLanguages();
  if (!allLanguages) return res.status(404).send('No languages found');
  res.send(allLanguages).status(200);
}

export async function updateUserLanguages(req: Request, res: Response) {
  const uid = req.params.uid;
  if (!uid) return res.status(400).send('No uid provided');

  const user = await model.user.findUniqueUser(uid);
  if (!user) return res.status(404).send('User not found');

  const deletedLang = await model.language.deleteUsersToLanguages(user.id);
  if (!deletedLang) return res.status(400).send('Error deleting languages');

  const newLang = await model.language.createUsersToLanguages(
    req.body.languages,
    user.id
  );
  if (!newLang) return res.status(400).send('Error creating languages');

  const newUserData = await model.user.findUserComplete(uid);

  return res.status(200).send(newUserData);
}
