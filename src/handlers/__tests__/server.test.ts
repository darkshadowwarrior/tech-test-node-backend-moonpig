import request from 'supertest'
import { app } from '../server'

describe('server', () => {

  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
  })

  test('returns matching card title', async () => {
    const response = await request(app).get('/cards');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining([
      {"imageUrl": "/front-cover-portrait-1.jpg", "title": "card 1 title", "url": "card/card001"}, 
      {"imageUrl": "/front-cover-portrait-2.jpg", "title": "card 2 title", "url": "card/card002"}, 
      {"imageUrl": "/front-cover-landscape.jpg", "title": "card 3 title", "url": "card/card003"}
    ]));
  })

  test('returns matching card based on given cardId and sizeId', async () => {
    const expected = {
      title: 'card 1 title',
      size: "gt",
      availableSizes: [{
        "id": "sm",
        "title": "Small"
      },
      {
        "id": "md",
        "title": "Medium"
      },
      {
        "id": "gt",
        "title": "Giant"
      }],
      imageUrl: '/front-cover-portrait-1.jpg',
      price: "£4.00",
      pages: [
        {
          height: 600,
          id: "template001",
          imageUrl: "/front-cover-portrait-1.jpg",
          width: 300,
        },
        {
          height: 600,
          id: "template002",
          imageUrl: "",
          width: 300,
        },
        {
          height: 600,
          id: "template003",
          imageUrl: "",
          width: 300,
        },
        {
          height: 600,
          id: "template004",
          imageUrl: "/back-cover-portrait.jpg",
          width: 300,
        }
      ]
    };

    const response = await request(app).get('/cards/card001/gt');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(expected));
  })

  test('returns error when card not found by cardId and sizeId', async () => {
    const expected = {error: "Failed to get card for cardId: card007 with sizeId: gt"};
    
    const response = await request(app).get('/cards/card007/gt');

    expect(response.status).toBe(500);
    expect(JSON.parse(response.text)).toEqual(expected);
  })

  test('returns matching card based on given cardId', async () => {
    const expected = {
      title: 'card 1 title',
      price: "£2.00",
      availableSizes: ["sm", "md", "gt"],
      imageUrl: '/front-cover-portrait-1.jpg',
      pages: [
        {
          height: 600,
          id: "template001",
          imageUrl: "/front-cover-portrait-1.jpg",
          width: 300,
        },
        {
          height: 600,
          id: "template002",
          imageUrl: "",
          width: 300,
        },
        {
          height: 600,
          id: "template003",
          imageUrl: "",
          width: 300,
        },
        {
          height: 600,
          id: "template004",
          imageUrl: "/back-cover-portrait.jpg",
          width: 300,
        }
      ]
    };
    
    const response = await request(app).get('/cards/card001');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(expected));
  })

  test('returns error when card not found', async () => {
    const expected = {error: "Failed to get card for cardId: card007"};
    
    const response = await request(app).get('/cards/card007');

    expect(response.status).toBe(500);
    expect(JSON.parse(response.text)).toEqual(expected);
  })
})




