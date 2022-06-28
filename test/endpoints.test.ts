import { supertest } from './app';
import { describe, expect, test } from '@jest/globals';

describe('API CALLS', () => {
  //No need to set port

  it('Started testing', () => {
    expect(true).toBe(true);
  });

  describe('Entry point should quack', () => {
    test('Entry point', async () => {
      const response = await supertest.get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('🦆🦆🦆🦆🦆Quack Quack Quack🦆🦆🦆🦆🦆');
    });

    describe('USER', () => {
      test('GET /users should return 200 and return users', async () => {
        const response = await supertest.get('/users');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
      });

      let userId: string;
    });
  });
});
