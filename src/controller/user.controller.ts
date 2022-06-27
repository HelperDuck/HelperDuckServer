import { Request, Response } from 'express';
import { PrismaClient, Technology, UsersToTechnologies } from '@prisma/client';
import model from '../model/index';

const prisma = new PrismaClient();

export async function getUser(req: Request, res: Response) {
  const uid = req.params.uid;
  if (!uid) return res.status(400).send('No uid provided');

  try {
    // search by param but if empty look in header for id
    const uid = req.params.uid;

    //To model
    const user = await prisma.user.findUnique({
      where: {
        uid: uid,
      },
      include: {
        technologies: { include: { technology: true } },
        languages: { include: { language: true } },
      },
    });

    if (!user) return res.status(404).send('User not found');

    //Added fields but needs to be queried for
    const userComplete = {
      ...user,
      openedRequests: 20,
      acceptedRequests: 2,
      avgTip: 20.21,
      rating: 4.5,
    };

    res.status(200);

    res.send(userComplete);
  } catch (err) {
    console.log('Error at getUserProfile Controller ', err);
    res.sendStatus(400);
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const uid = req.params.uid;
    const user = await prisma.user.findUnique({
      where: {
        uid: uid,
      },
    });

    if (!user) return res.status(404).send('User not found');

    const userUnnesstted = req.body;

    //Because these are nested they need to be removed before updating
    const technologies = userUnnesstted.technologies;
    const languages = userUnnesstted.languages;
    delete userUnnesstted.technologies;
    delete userUnnesstted.languages;

    console.log(technologies);

    const userUpdate = {
      ...user,
      ...userUnnesstted,
    };

    const updatedUser = await prisma.user.update({
      where: {
        uid: uid,
      },
      data: userUpdate,
    });

    //Update technologies
    if (technologies) {
      await model.technologies.deleteUsersToTechnologies(user.id);
      await model.technologies.createUsersToTechnologies(technologies, user.id);
    }

    res.status(200);
    res.send(updatedUser);
  } catch (err) {
    console.log('Error at updateUser Controller ', err);
    res.sendStatus(400);
  }
}

//User related. Test for build // test
export async function createNewUser(req: Request, res: Response) {
  try {
    const {
      uid,
      userName,
      email,
      firstName,
      lastName,
      userBio,
      gitHubProfile,
      profilePic,
      technologies,
      languages,
    } = req.body;

    //Check for neccessary fields
    if (!uid || !userName || !email || !profilePic) {
      res.send(
        `Missing fields in request: ${!uid ? 'uid' : ''} ${
          !userName ? 'userName' : ''
        } ${!email ? 'email' : ''} ${!profilePic ? 'profilePic' : ''}`
      );
      return res.status(400);
    }

    //Check if no unqiue fields are double
    const userExists = await prisma.user.findFirst({
      where: { OR: [{ uid: uid }, { userName: userName }, { email: email }] },
    });

    if (userExists) {
      res.send(`User already exists with: ${uid} ${userName} ${email}`);
      return res.status(400);
    }

    //Create user
    const user = await prisma.user.create({
      data: {
        uid: uid,
        userName: userName,
        email: email,
        firstName: firstName,
        lastName: lastName,
        userBio: userBio,
        gitHubProfile: gitHubProfile,
        profilePic: profilePic,
        technologies: {
          create: technologies.map((tech: any) => {
            return { technology: { connect: { name: tech.technology.name } } };
          }),
        },
        languages: {
          create: languages.map((lang: any) => {
            return { language: { connect: { code: lang.language.code } } };
          }),
        },
      },
    });

    res.send(user);
    return res.status(201);
  } catch (err) {
    console.log('Error at postUserProfile Controller', err);
    res.sendStatus(400);
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const uid = req.params.uid;

    const user = await prisma.user.findUnique({
      where: {
        uid: uid,
      },
    });

    if (!user) return res.status(404).send('User not found');

    await prisma.usersToTechnologies.deleteMany({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    await prisma.usersToLanguages.deleteMany({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    await prisma.user.delete({
      where: {
        uid: uid,
      },
    });

    res.send(user);
    res.status(200);
  } catch (err) {
    console.log('Error at deleteUserProfile Controller', err);
    return res.status(404).send('User not found');
  }
}
