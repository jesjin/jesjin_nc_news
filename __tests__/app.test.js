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
                });
            });
    });
});

describe('GET /api/articles/:article_id', () => {
    test('200: responds with an article object', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .expect("Content-Type", /json/)
        .then(({ body }) => {
          const expectedShape = {
            author: expect.any(String),
            title: expect.any(String),
            article_id: 1,
            body: expect.any(String),
            topic: expect.any(String),     
            created_at: expect.any(String),          
            votes: expect.any(Number),
            article_img_url: expect.any(String)
          };
        });
    });
    test('400: responds with "Bad Request" for invalid article ID', () => {
        return request(app)
        .get('/api/articles/${invalidArticleID}')
        .expect(400)
        .expect('Content-Type', /json/)
        .then(({ body }) => {
            expect(body.msg).toBe('Bad Request - Article ID was invalid.');
        });
    });
    test('404: responds with "Article not found" for non-existent article ID', () => {
        return request(app)
        .get('/api/articles/999')
        .expect(404)
        .expect('Content-Type', /json/)
        .then(({ body }) => {
            expect(body.msg).toBe('Article not found');
        });
    });
});

describe('GEt /api/articles', () => {
    test('200: responds with an array of article objects', () => { 
        return request(app)
        .get('/api/articles')
        .expect(200)
        .expect('Content-Type', /json/)
        .then (({ body }) => {
            expect(body.articles).toBeInstanceOf(Array);
            expect(body.articles.length).toBeGreaterThan(0);
            const expectedArticleShape = {
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String),
                comment_count: expect.any(String),
            };
            body.articles.forEach((article) => {
                expect(article).toMatchObject(expectedArticleShape);
            });
            expect(body.articles).toBeSortedBy('created_at', { descending: true});
        });
    })
});

describe('GET /api/articles/:article_id/comments', () => {
    test('200: responds with an array of comments for the given article_id', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(({ body }) => {
            expect(body.comments).toBeInstanceOf(Array);
            expect(body.comments.length).toBeGreaterThan(0);
            body.comments.forEach((comment) => {
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    body: expect.any(String),
                    article_id: expect.any(Number),
                    author: expect.any(String),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                });
            });
            expect(body.comments).toBeSortedBy('created_at', { descending: true });
        });
    });
    test('400: responds with "Bad Request" for invalid article id', () => {
        return request(app)
        .get('/api/articles/invalidID/comments')
        .expect(400)
        .expect('Content-Type', /json/)
        .then(({ body })=> {
            expect(body.msg).toBe('Bad Request - Article ID was invalid.');
        });
    });
});

