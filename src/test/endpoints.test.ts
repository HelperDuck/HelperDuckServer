import request from 'supertest';
import { describe, expect, test } from '@jest/globals';
import Express from 'express';
import Cors from 'cors';
import router from '../router/router';

describe('API CALLS', () => {
  //No need to set port
  const app = Express();
  app.use(Cors()).use(Express.json());

  app.use(router);
  const supertest = request(app);

  it('Started testing', () => {
    expect(true).toBe(true);
  });

  describe('Entry point should quack', () => {
    test('Entry point', async () => {
      const response = await supertest.get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('🦆🦆🦆🦆🦆Quack Quack Quack🦆🦆🦆🦆🦆');
    });
  });
});
