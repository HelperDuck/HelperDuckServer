import { supertest } from '../testServer';
import { describe, expect, test } from '@jest/globals';
import mocks from '../mocks/index.mocks';

const helpRequestReview = {
  rating: '5',
  comment: 'This is a comment',
  // role: 'helpAsker', done in controller
  userId: '2',
  helpRequestId: '1',
};

const helpOfferReview = {
  rating: '5',
  comment: 'This is a comment',
  // role: 'helpGiver', done in controller
  userId: '1',
  helpOfferId: '1',
};

describe('review', () => {
  test('GET /reviews should return 200', async () => {
    const response = await supertest.get('/helpReviews');
    expect(response.status).toBe(200);
  });

  test('POST /reviews should return 400 when no data is send', async () => {
    const response = await supertest.post('/helpReview');
    expect(response.status).toBe(400);
  });

  test('POST /reviews should return 200 when a helpRequestReview is send', async () => {
    const response = await supertest.post('/helpReview').send(helpRequestReview);
    expect(response.status).toBe(200);
  });

  test('POST /reviews should return 200 when helpOfferReview is send', async () => {
    const response = await supertest.post('/helpReview').send(helpOfferReview);
    expect(response.status).toBe(200);
  });

  test('GET /reviews should return reviews', async () => {
    const response = await supertest.get('/helpReviews');
    expect(response.body.length).toBeGreaterThan(0);
  });
});
