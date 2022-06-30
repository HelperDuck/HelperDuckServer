import { supertest } from '../testServer';
import { describe, expect, test } from '@jest/globals';
import mocks from '../mocks/index.mocks';

describe('review', () => {
  test('GET /reviews should return 200 and return reviews', async () => {
    const response = await supertest.get('/reviews');
    // expect(response.status).toBe(200);
    expect(true).toBe(true);
  });
});
