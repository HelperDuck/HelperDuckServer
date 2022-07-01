import { supertest } from '../testServer';
import { describe, expect, test } from '@jest/globals';

describe('helpOffer - API calls', () => {
  describe('findHelpOffers tests', () => {
    test('/findHelpOffers? should return 400 because no query is provided', async () => {
      const response = await supertest.get('/findHelpOffers');
      expect(response.status).toBe(400);
      expect(response.text).toBe('No query provided. Please provide at least one search parameter');
    });

    test('/findHelpOffers?userId=103 should return 400 because this user does not exists in seed data', async () => {
      const response = await supertest.get('/findHelpOffers?').query({ userId: 103, searchType: 'AND' });
      expect(response.status).toBe(404);
      expect(response.text).toBe('User not found');
    });

    test('/findHelpOffers?userId=2 should return 200 because user has solved helpRequests', async () => {
      const response = await supertest
        .get('/findHelpOffers?')
        .query({ userId: 3, searchType: 'AND', status: 'solved' });
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      const helpOffers = response.body;

      for (const helpOffer of helpOffers) {
        expect(helpOffer.status).toBe('solved');
        expect(helpOffer.userId).toBe(3);
      }
    });
  });
});
