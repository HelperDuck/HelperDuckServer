import request from 'supertest';
import { describe, expect, test } from '@jest/globals';
import Express from 'express';
import Cors from 'cors';
import router from '../router/router';

describe('API CALLS', () => {
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
      console.log('GetResponse', response);

      expect(response.status).toBe(200);
      // expect(response.body[0].latin).toBe('Aeschynanthus lobianus');
    });
  });
});
