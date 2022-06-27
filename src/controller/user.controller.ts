import { Request, Response } from 'express';
import model from '../model/index';

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

  const user = await model.user.findUniqueUser(uid);
  if (!user) return res.status(404).send('User not found');

  const userUnnesstted = req.body;

  //Because these are nested they need to be removed before updating
  const technologies = userUnnesstted.technologies;
  const languages = userUnnesstted.languages;
  delete userUnnesstted.technologies;
  delete userUnnesstted.languages;

  const userUpdate = {
    ...user,
    ...userUnnesstted,
  };

  const updateRes = await model.user.updateUser(userUpdate);
  if (!updateRes) return res.status(400).send('Error updating user');

  //Update technologies
  if (technologies) {
    const deleteTech = await model.technology.deleteUsersToTechnologies(
      updateRes.id
    );
    console.log('deleteTech', deleteTech);
    if (!deleteTech) return res.status(400).send('Error deleting technologies');
    const newTech = await model.technology.createUsersToTechnologies(
      technologies,
      updateRes.id
    );
    if (!newTech) return res.status(400).send('Error creating technologies');
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
      .send(
        `Missing fields in request: ${!uid ? 'uid' : ''} ${
          !userName ? 'userName' : ''
        } ${!email ? 'email' : ''}`
      );
  }

  //Check if no unqiue fields are double
  const userExists = await model.user.findUniqueUser(uid, userName, email);
  if (userExists) return res.status(400).send('User already exists');

  //Because these are nested they need to be removed before updating
  const userUnnesstted = req.body;
  const technologies = userUnnesstted.technologies;
  const languages = userUnnesstted.languages;
  delete userUnnesstted.technologies;
  delete userUnnesstted.languages;

  const newUser = await model.user.createUser(userUnnesstted);
  if (!newUser) return res.status(400).send('Error creating user');

  //Update technologies
  if (technologies) {
    const newTech = await model.technology.createUsersToTechnologies(
      technologies,
      newUser.id
    );
    if (!newTech) return res.status(400).send('Error creating technologies');
  }

  //Update languages
  if (languages) {
    const newLang = await model.language.createUsersToLanguages(
      languages,
      newUser.id
    );
    if (!newLang) return res.status(400).send('Error creating languages');
  }

  const newUserCompleet = await model.user.findUserComplete(newUser.uid);
  return res.status(200).send(newUserCompleet);
}

export async function deleteUser(req: Request, res: Response) {
  const uid = req.params.uid;
  if (!uid) return res.status(400).send('No uid provided');

  const user = await model.user.findUniqueUser(uid);
  if (!user) return res.status(404).send('User not found');

  const deleteTech = await model.technology.deleteUsersToTechnologies(user.id);
  if (!deleteTech) return res.status(400).send('Error deleting technologies');

  const deleteLang = await model.language.deleteUsersToLanguages(user.id);
  if (!deleteLang) return res.status(400).send('Error deleting languages');

  const deletedUser = await model.user.deleteUser(uid);
  if (!deletedUser) return res.status(400).send('Error deleting user');

  return res.status(200).send(deletedUser);
}
