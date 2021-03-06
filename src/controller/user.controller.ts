import { Request, Response } from 'express';
import model from '../model/index.models';
import { Decimal } from '@prisma/client/runtime';

export async function getAllUsers(req: Request, res: Response) {
  const users = await model.user.getAllUsers();
  if (!users) return res.status(400).send('Error getting users');
  return res.status(200).send(users);
}

export async function getUser(req: Request, res: Response) {
  const uid = req.params.uid;
  if (!uid) return res.status(400).send('No uid provided');

  const user = await model.user.findUserComplete(uid);
  if (!user) return res.status(404).send('User not found');

  res.status(200).send(user);
}

export async function updateUser(req: Request, res: Response) {
  const uid = req.params.uid;
  if (!uid) return res.status(400).send('No uid provided');

  const user = await model.user.findUniqueUser({ uid });
  if (!user) return res.status(404).send('User not found');

  const userUnnested = req.body;

  //Because these are nested they need to be removed before updating
  const technologies = userUnnested.technologies;
  const languages = userUnnested.languages;
  delete userUnnested.technologies;
  delete userUnnested.languages;

  const userUpdate = {
    ...user,
    ...userUnnested,
  };

  const updateRes = await model.user.updateUser(userUpdate);
  if (!updateRes) return res.status(400).send('Error updating user');

  //Update technologies
  if (technologies) {
    const deleteTech = await model.technology.deleteUsersToTechnologies(updateRes.id);
    if (!deleteTech) return res.status(400).send('Error deleting technologies');
    const newTech = await model.technology.createUsersToTechnologies(technologies, updateRes.id);
    if (!newTech) return res.status(400).send('Error creating technologies');
  }

  //Update languages
  if (languages) {
    const deleteLang = await model.language.deleteUsersToLanguages(updateRes.id);
    if (!deleteLang) return res.status(400).send('Error deleting languages');
    const newLang = await model.language.createUsersToLanguages(languages, updateRes.id);
    if (!newLang) return res.status(400).send('Error creating languages');
  }

  const newUserData = await model.user.findUserComplete(uid);

  return res.status(200).send(newUserData);
}

//User related. Test for build // test
export async function createNewUser(req: Request, res: Response) {
  const { uid, userName, email } = req.body;

  if (!uid || !userName || !email) {
    return res
      .status(400)
      .send(`Missing fields in request: ${!uid ? 'uid' : ''} ${!userName ? 'userName' : ''} ${!email ? 'email' : ''}`);
  }

  //Check if no unique fields are double
  const userExists = await model.user.findUniqueUser({ uid, userName, email });
  if (userExists) return res.status(400).send('User already exists');

  //Because these are nested they need to be removed before updating
  const userUnnested = req.body;
  const technologies = userUnnested.technologies;
  const languages = userUnnested.languages;
  delete userUnnested.technologies;
  delete userUnnested.languages;

  const newUser = await model.user.createUser(userUnnested);
  if (!newUser) return res.status(400).send('Error creating user');

  //Update technologies
  if (technologies) {
    const newTech = await model.technology.createUsersToTechnologies(technologies, newUser.id);
    if (!newTech) return res.status(400).send('Error creating technologies');
  }

  //Update languages
  if (languages) {
    const newLang = await model.language.createUsersToLanguages(languages, newUser.id);
    if (!newLang) return res.status(400).send('Error creating languages');
  }

  const newUserComplete = await model.user.findUserComplete(newUser.uid);
  return res.status(200).send(newUserComplete);
}

export async function deleteUser(req: Request, res: Response) {
  const uid = req.params.uid;
  if (!uid) return res.status(400).send('No uid provided');

  const user = await model.user.findUniqueUser({ uid });
  if (!user) return res.status(404).send('User not found');

  const deleteTech = await model.technology.deleteUsersToTechnologies(user.id);
  if (!deleteTech) return res.status(400).send('Error deleting technologies');

  const deleteLang = await model.language.deleteUsersToLanguages(user.id);
  if (!deleteLang) return res.status(400).send('Error deleting languages');

  //TODO this puts
  const cancelHelpRequests = await model.helpRequest.updateHelpRequestOnDeletion(user.id);

  if (!cancelHelpRequests) return res.status(400).send('Error cancelling help requests');

  const deletedUser = await model.user.deleteUser(uid);
  if (!deletedUser) return res.status(400).send('Error deleting user');

  return res.status(200).send(deletedUser);
}

export async function addCredits(req: Request, res: Response) {
  console.log(req.params, 'req params at addCredits');
  const uid = req.params.uid;
  if (!uid) return res.status(400).send('No uid provided');

  const user = await model.user.findUniqueUser({ uid });
  if (!user) return res.status(404).send('User not found');

  const creditsBought = new Decimal(parseInt(req.body.creditsBought));
  if (!creditsBought) return res.status(400).send('No creditsBought provided');

  if (req.body.superSecret !== 'superSecret') return res.status(400).send('Not authorized');

  const updatedUser = await model.user.changeCredits(user, { creditsBought: creditsBought });
  if (!updatedUser) return res.status(400).send('Error updating user');

  return res.status(200).send(updatedUser);
}
