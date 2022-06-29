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

    test('All methods return 404 to invalid routes', async () => {
      const response = await supertest.get('/invalid');
      expect(response.status).toBe(404);
      expect(response.text).toBe('404 Not Found');

      const response2 = await supertest.post('/invalid');
      expect(response2.status).toBe(404);
      expect(response2.text).toBe('404 Not Found');

      const response3 = await supertest.put('/invalid');
      expect(response3.status).toBe(404);
      expect(response3.text).toBe('404 Not Found');

      const response4 = await supertest.delete('/invalid');
      expect(response4.status).toBe(404);
      expect(response4.text).toBe('404 Not Found');
    });
  });
});
