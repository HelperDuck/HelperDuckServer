import { supertest } from './app';
import { describe, expect, test } from '@jest/globals';
import mocks from './mocks/index.mocks';
import { User } from '@prisma/client';

describe('USER', () => {
  test('GET /users should return 200 and return users', async () => {
    const response = await supertest.get('/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /user/xxx should return the first user', async () => {
    const response = await supertest.get('/user/jcLzJnBP2mZnKA53NhpYmp3gpkl1');
    expect(response.status).toBe(200);
    expect(response.body.userName).toBe('Siebe');
  });

  test('GET /user/xxxx should return 404 because user does not exist', async () => {
    const response = await supertest.get('/user/xxxx');
    expect(response.status).toBe(404);
  });

  let user: User;
  //Delete user to make sure test starts with a clean database
  beforeEach(async () => {
    await supertest.delete(`/user/${mocks.mockUser.user.uid}`);
  });

  test('Post user with no data should return 400', async () => {
    const response = await supertest.post('/user');
    expect(response.status).toBe(400);
  });

  test('POST /user should return 201 and return the new user', async () => {
    const response = await supertest.post('/user').send(mocks.mockUser.user);
    expect(response.status).toBe(200);
    expect(response.body.userName).toBe('testUser');
    user = response.body;
  });

  test('POST /user should return 400 because user already exists', async () => {
    const response = await supertest.post('/user').send(mocks.mockUser.user);
    expect(response.status).toBe(400);
  });

  test('POST /user/:uid/technologies should return 200 and return the new technology', async () => {
    const response = await supertest
      .post(`/user/${user.uid}/technologies`)
      .send(mocks.mockUser.updateTechnology);
    expect(response.status).toBe(200);
  });

  test('PUT /user/:uid should return 200 and return the updated user', async () => {
    const response = await supertest
      .put(`/user/${user.uid}`)
      .send(mocks.mockUser.updateUser);
    expect(response.status).toBe(200);
    expect(response.body.userName).toBe('testUpdated');
  });

  test('Delete user should return 200', async () => {
    const response = await supertest.delete('/user/' + user.uid);
    expect(response.status).toBe(200);
  });

  test('Delete user should return 404 because user does not exist', async () => {
    const response = await supertest.delete('/user/' + user.uid);
    expect(response.status).toBe(404);
  });
});
