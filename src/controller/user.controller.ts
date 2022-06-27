import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getUser(req: Request, res: Response) {
  try {
    //This is how we can query for users
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.uid),
      },
      include: {
        programLangs: { include: { programLang: true } },
      },
    });

    console.log(user);

    res.status(200);

    res.send(user);
  } catch (err) {
    console.log('Error at getUserProfile Controller ', err);
    res.sendStatus(400);
  }
}

//User related. Test for build //test for build
export async function postUserProfile(req: Request, res: Response) {
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      userBio,
      profilePic,
      thecnologies,
      languages,
      gitHubProfile,
      openedRequests,
      acceptedRequests,
      avgTip,
      rating,
    } = req.body;

    // const result = await mockModel.create({    //uncomment and replace mock model and sintaxe to add into DBase
    const result = {
      //mock, delete after model and database are done
      firstName,
      lastName,
      userName,
      email,
      userBio,
      profilePic,
      thecnologies,
      languages,
      gitHubProfile,
      openedRequests,
      acceptedRequests,
      avgTip,
      rating,
    };
    res.send(result);
    res.status(201);
  } catch (err) {
    console.log('Error at postUserProfile Controller', err);
    res.sendStatus(400);
  }
}

export async function getUserProfile(req: Request, res: Response) {
  try {
    // const user = await mockModel.findById(req.params.uid);  //uncomment and replace mock model and sintaxe to add into DBase
    const user = req.params.uid; //mock, delete after model and database are done
    res.status(200);
    res.send(user);
  } catch (err) {
    console.log('Error at getUserProfile Controller ', err);
    res.sendStatus(400);
  }
}
