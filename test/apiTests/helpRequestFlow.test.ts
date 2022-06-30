import { supertest } from '../testServer';
import { describe, expect, test } from '@jest/globals';
import mocks from '../mocks/index.mocks';
import { User } from '@prisma/client';

describe('helpRequestRoute', () => {
  //Comes from initial seeding of database

  //User 1 makes a helpRequest
  let user: User;
  let helpRequest: any;
  let helpRequestData: any;
  let helpOffer: any;

  //Get user test (id = 1 uid = test)
  test('GET /user/test should return 200 and return user 1', async () => {
    const response = await supertest.get('/user/test');
    expect(response.status).toBe(200);
    expect(response.body.userName).toBe('test');
    user = response.body;
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
    const response = await supertest.post(`/helpRequest/${helpRequest.id}/${helpOffer.id}/solved`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('solved');
  });
});
