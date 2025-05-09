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

  test('returns matching card based opn given cardId and sizeId', async () => {
    const response = await request(app).get('/cards/card001/gt')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      title: 'card 1 title',
    }))
  })

  //test included in the repo but not mentioned in the README
  // unsure if this needs addressing but will do it just in case
  test('returns matching card title', async () => {
    const response = await request(app).get('/cards/card001')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      title: 'card 1 title',
    }))
  })
})




