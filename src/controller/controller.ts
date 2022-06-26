import Express, { Request, Response } from 'express';



//Requests related functions

export async function getAllIncomingRequests(req: Request, res: Response) {
  try {
    // let allRequests = await mockModel.find();   //uncomment and replace mock model and sintaxe to add into DBase
    const allRequests = {  //mock, delete after model and database are done
      "uid":"aadahdZD1",
      "firstName": "John",
      "lastName": "Doe",
      "userName": "jd",
      "email": "john.doe@abc.com",
      "userBio": "I am John Doe, Junior Developer based in LA",
      "profilePic": "http://google.com/",
      "technologies": "['JavaScript', 'React', 'Redux']",
      "languages": "['English', 'Spanish']",
      "gitHubProfile": "https://github.com/johndoe",
      "openedRequests": "20",
      "acceptedRequests": "2",
      "avgTip": "20",
      "rating": "4.5" 
     }
    res.status(200);
    res.send(allRequests);
  } catch (err) {
    console.log("Error at getAllIncomingRequests Controller", err);
    res.sendStatus(400);
  }
};


export async function postRequest(req: Request, res: Response) {
  try {
    const {
      uid,
      createdBy,
      createdAt,
      status,
      subject,
      description,
      codeSnippet,
      linkToSandbox,
      languages,
      technologies,
      roomId
    } = req.body;
    console.log(uid, 'uid')

    const result = {   //mock, delete after model and database are done
      uid,
      createdBy,
      createdAt,
      status,
      subject,
      description,
      codeSnippet,
      linkToSandbox,
      languages,
      technologies,
      roomId
    };

    console.log(result)

    // const result = await mockModel.create({      //uncomment and replace mock model and sintaxe to add into DBase
    //   createdBy,
    //   createdAt,
    //   status,
    //   subject,
    //   description,
    //   codeSnippet,
    //   linkToSandbox,
    //   languages,
    //   technologies,
    //   roomId
    // });
    res.send(result);
    res.status(201);
  } catch (err) {
    console.log("Error at PostRequest Controller", err);
    res.sendStatus(400);
  }
}



//User related. 

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
      rating
    } = req.body;
    
    // const result = await mockModel.create({    //uncomment and replace mock model and sintaxe to add into DBase
    const result = { //mock, delete after model and database are done
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
      rating
    };
    res.send(result);
    res.status(201);
  } catch (err) {
    console.log("Error at postUserProfile Controller", err);
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
    console.log("Error at getUserProfile Controller ", err);
    res.sendStatus(400);
  }
} 


