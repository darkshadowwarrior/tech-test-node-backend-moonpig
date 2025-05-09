import request from 'supertest'
import { app } from '../server'

describe('server', () => {

  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true })
  })

  test('returns matching card title', async () => {
    const response = await request(app).get('/cards')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining([
      {"imageUrl": "/front-cover-portrait-1.jpg", "title": "card 1 title", "url": "card/card001"}, 
      {"imageUrl": "/front-cover-portrait-2.jpg", "title": "card 2 title", "url": "card/card002"}, 
      {"imageUrl": "/front-cover-landscape.jpg", "title": "card 3 title", "url": "card/card003"}
    ]))
  })

  //TODO:  Make sure you write some tests to cover errors like 500 and 400 errors

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

    const response = await request(app).get('/cards/card001/gt')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining(expected))
  })

  //test included in the repo but not mentioned in the README
  // unsure if this needs addressing but will do it just in case
  test('returns matching card based on given cardId', async () => {
    const expected = {
      title: 'card 1 title',
      price: 200,
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
    
    const response = await request(app).get('/cards/card001')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining(expected))
  })
})




