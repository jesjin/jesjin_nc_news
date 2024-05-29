const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/topics', () => {
  test('200: responds with an array of topic objects', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .expect("Content-Type", /json/)
      .then(({ body }) => {
        expect(body.topics).toBeInstanceOf(Array);
        expect(body.topics.length).toBeGreaterThan(0);
        const expectedTopicShape = {
            description: expect.any(String),
            slug: expect.any(String),
        };
        body.topics.forEach((topic) => {
            expect(topic).toMatchObject(expectedTopicShape);
        });
      });
  });
});

describe('GET /api', () => {
    test('200: responds with JSON object describing all available endpoints', () => {
        return request(app)
            .get('/api')
            .expect(200)
            .expect("Content-Type", /json/)
            .then(({ body }) => {
                const expectedShape = {
                    description: expect.any(String),
                    queries: expect.any(Array),
                    exampleResponse: expect.any(Object),
                };
                const arr = Object.values(body);
                arr.forEach((item) => {
                    expect(item).toMatchObject(expectedShape);
                })
            })
    })
})