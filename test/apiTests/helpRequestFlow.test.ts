import { supertest } from '../testServer';
import { describe, expect, test } from '@jest/globals';
import mocks from '../mocks/index.mocks';
import { Prisma, User } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

describe('helpRequestRoute', () => {
  //Comes from initial seeding of database

  //User 1 makes a helpRequest
  let user: User;
  let requestSolver: User;
  let helpRequest: any;
  let helpRequestData: any;
  let helpOffer: any;
  let solvedRequest: any;

  let creditRequestUser: Decimal;
  let creditOfferUser: Decimal;

  //Get user test (id = 1 uid = test)
  test('GET /user/test should return 200 and return user 1', async () => {
    const response = await supertest.get('/user/test');
    expect(response.status).toBe(200);
    expect(response.body.userName).toBe('test');
    user = response.body;
    creditRequestUser = user.credits;
  });

  //Add credits to user so that user can make a helpRequest
  //TODO: Make add function to add credits securely
  test('POST /user/test/credits should return 200 and add 10 credits to user 1', async () => {
    const creditsObject = {
      creditsBought: '10',
      superSecret: 'superSecret',
    };

    const response = await supertest.post(`/user/${user.uid}/addCredits`).send(creditsObject);
    expect(response.status).toBe(200);
    expect(parseInt(response.body.credits)).toBe(new Decimal(creditRequestUser).add(10).toNumber());
    creditRequestUser = new Decimal(response.body.credits);
    user.credits = creditRequestUser;
  });

  test('GET request solver', async () => {
    const response = await supertest.get('/user/AfAM70bjo9MHY8bzzD1DIeDhNxP2');
    expect(response.status).toBe(200);
    expect(response.body.userName).toBe('Noel');
    requestSolver = response.body;
    creditOfferUser = requestSolver.credits;
  });

  //Create a helpRequest with all data
  test('POST /helpRequest should return 200 and return the new helpRequest', async () => {
    const helpRequestData = {
      ...mocks.mockHelpRequest.helpRequestTotal,
      userId: user.id,
    };
    const response = await supertest.post('/helpRequest').send(helpRequestData);
    expect(response.status).toBe(200);
    helpRequest = response.body;
    expect(helpRequest.subject).toBe('Help with css');
    expect(helpRequest.status).toBe('open');
    expect(helpRequest.technologies.length).toBe(2);
    expect(helpRequest.user.userName).toBe('test');
  });

  //Create a helpOffer decline so that users can remove them in the frontend
  test('POST /helpOffer/decline should return 200 and return the new helpOffer', async () => {
    const helpOfferData = { userId: 5 };
    const response = await supertest.post(`/helpRequest/${helpRequest.id}/helpOfferDecline`).send(helpOfferData);
    expect(response.status).toBe(200);
    helpOffer = response.body;
    expect(helpOffer.status).toBe('declined');
  });

  //Test create helpOffer for this helpRequest
  test('POST /helpOffer should return 200 and return the new helpOffer', async () => {
    const response = await supertest.post(`/helpRequest/${helpRequest.id}/helpOffer`).send({ userId: 2 });
    helpOffer = response.body;
    expect(response.status).toBe(200);
    expect(helpOffer.user.userName).toBe('Siebe');
    expect(helpOffer.status).toBe('open');
  });

  //decline helpOffer for this helpRequest
  test('Decline helpOffer - POST /helpRequest/:helpRequestId/helpOffer/:helpOfferId/decline should return 200 and return the new helpOffer', async () => {
    const response = await supertest.post(`/helpRequest/${helpRequest.id}/helpOffer/${helpOffer.id}/decline`);
    expect(response.status).toBe(200);
    expect(response.body.user.userName).toBe('Siebe');
    expect(response.body.status).toBe('declined');
  });

  //create a new helpRequest to show user
  test('POST /helpOffer should return 200 and return the new helpOffer', async () => {
    const response = await supertest.post(`/helpRequest/${helpRequest.id}/helpOffer`).send({ userId: 3 });
    helpOffer = response.body;
    expect(response.status).toBe(200);
    expect(helpOffer.user.userName).toBe('Noel');
    expect(helpOffer.status).toBe('open');
  });

  //accept helpOffer for this helpRequest
  test('ACCEPT helpOffer - POST /helpRequest/:helpRequestId/helpOffer/:helpOfferId/accept should return 200 and return the new helpOffer', async () => {
    const response = await supertest.post(`/helpRequest/${helpRequest.id}/helpOffer/${helpOffer.id}/accept`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('accepted');
  });

  //Upon Acceptance and then after helpRequest the helpRequest should be set to solved and the HelpOffer should be solved
  //Here also the tipSend and tipReceived and the review should be created
  //This would be done at the end of the meeting by the HelpRequester
  test('/helpRequest/:helpRequestId/:helpOfferId/solved', async () => {
    const response = await supertest
      .post(`/helpRequest/${helpRequest.id}/${helpOffer.id}/solved`)
      .send(mocks.mockHelpRequest.solvedBody);

    expect(response.status).toBe(200);

    solvedRequest = response.body;
    expect(solvedRequest.status).toBe('solved');
    expect(parseInt(solvedRequest.tipGiven)).toBe(10);

    //needs to be third helpOffer since the first and second are declined
    expect(solvedRequest.helpOffers[2].status).toBe('solved');
    expect(parseInt(solvedRequest.helpOffers[2].tipReceived)).toBe(10);
    expect(solvedRequest.reviews.length).toBeGreaterThan(0);
  });

  //Test if the credits are added and subtracted correctly
  test('new credits for helpGiver and helpAsker should be correctly be exchanged', async () => {
    const response = await supertest.get('/user/test');
    expect(response.status).toBe(200);
    user = response.body;
    expect(response.body.credits).toBe(new Decimal(creditRequestUser).minus(10).toString());

    const response2 = await supertest.get('/user/AfAM70bjo9MHY8bzzD1DIeDhNxP2');
    expect(response2.status).toBe(200);
    user = response2.body;
    expect(response2.body.credits).toBe(new Decimal(creditOfferUser).plus(10).toString());
  });
});
