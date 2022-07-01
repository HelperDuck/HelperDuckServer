import { supertest } from '../testServer';
import { describe, expect, test } from '@jest/globals';
import mocks from '../mocks/index.mocks';
import { User } from '@prisma/client';

describe('helpRequest - API calls', () => {
  //Comes from initial seeding of database
  test('GET /helpRequests should return 200 and return helpRequests', async () => {
    const response = await supertest.get('/helpRequests');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(1);
  });

  //create a user and then create a helpRequest
  let user: User;
  let helpRequest: any;
  let helpRequestData: any;

  test('Delete user should return 404 because user does not exist', async () => {
    const response = await supertest.delete('/user/' + mocks.mockHelpRequest.user.uid);
    expect(response.status).toBe(404);
  });

  test('POST /user should return 200 and return the new user', async () => {
    const response = await supertest.post('/user').send(mocks.mockHelpRequest.user);
    expect(response.status).toBe(200);
    expect(response.body.userName).toBe('testUserHelpRequest');
    user = response.body;
  });

  //First get statement with false helpRequestId should return 404
  test('GET /helpRequest/uid should return 200 and return helpRequests', async () => {
    const response = await supertest.get('/helpRequest/' + 999);
    expect(response.status).toBe(404);
  });

  //Create a helpRequest by userID with minimal data
  test('POST /helpRequest should return 200 and return the new helpRequest', async () => {
    const helpRequestDataSmall = {
      userId: user.id,
      subject: 'TestHelpRequest',
    };
    const response = await supertest.post('/helpRequest').send(helpRequestDataSmall);
    expect(response.status).toBe(200);
    helpRequest = response.body;
    expect(helpRequest.subject).toBe('TestHelpRequest');
    expect(helpRequest.status).toBe('open');
    expect(helpRequest.technologies.length).toBe(0);
    expect(helpRequest.user.userName).toBe('testUserHelpRequest');
  });

  test('DELETE /helpRequest with no helpRequestId should return 400', async () => {
    const response = await supertest.delete('/helpRequest').query({});
    expect(response.status).toBe(400);
    expect(response.text).toBe('No helpRequestId provided');
  });

  test('DELETE /helpRequest?helpRequestId=doesNotExists with no helpRequestId should return 404', async () => {
    const response = await supertest.delete('/helpRequest?helpRequestId=doesNotExists');
    expect(response.status).toBe(400);
    expect(response.text).toBe('HelpRequest was not a int');
  });

  test('DELETE /helpRequest/:helpRequestId that does not exists should return 404', async () => {
    const response = await supertest.delete('/helpRequest?helpRequestId=999999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Request not found');
  });

  test('DELETE /helpRequest/:helpRequestId should return 200 and return the deleted helpRequest', async () => {
    const response = await supertest.delete('/helpRequest?helpRequestId=' + helpRequest.id);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(helpRequest.id);
  });

  //Insert second helpRequest with all data
  test('POST /helpRequest should return 200 and return the new helpRequest', async () => {
    //Create a helpRequestData object with the userId
    helpRequestData = {
      ...mocks.mockHelpRequest.helpRequestTotal,
      userId: user.id,
    };

    const response = await supertest.post('/helpRequest').send(helpRequestData);
    expect(response.status).toBe(200);
    helpRequest = response.body;
    expect(helpRequest.subject).toBe(helpRequestData.subject);
    expect(helpRequest.status).toBe('open');
    expect(helpRequest.technologies.length).toBe(helpRequestData.technologies.length);
    expect(helpRequest.user.id).toBe(helpRequestData.userId);
  });

  //Tests for getting helpRequests by different parameters
  test('GET /findHelpRequest with no query should return 400', async () => {
    const response = await supertest.get('/findHelpRequest');
    expect(response.status).toBe(400);
    expect(response.text).toBe(
      'No searchValues were provided, please use one of these: helpRequestId, technologies, userUid, userName, userId'
    );
  });

  test('true', async () => {
    expect(true).toBe(true);
  });

  //Should delete user and keep helpRequest
  test('Delete user should return 200', async () => {
    const response = await supertest.delete('/user/' + user.uid);
    expect(response.status).toBe(200);
  });

  test('GET /findHelpRequest? should still return the helpRequests but with status canceled', async () => {
    const response = await supertest.get(`/findHelpRequest?helpRequestId=${helpRequest.id}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].status).toBe('cancelled');
  });
});
