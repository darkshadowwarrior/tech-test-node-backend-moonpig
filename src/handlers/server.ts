import express from "express";
import { getCards } from "../usecases/get-cards/get-cards";

export const app = express()

app.set('json spaces', 2);

app.get('/cards', async (req, res) => {
  // respond with a list of cards
  const cards = await getCards();
  res.status(200).send(cards);
})

app.get('/cards/:cardId', () => {
  // respond with card by id
})

app.get('/cards/:cardId/:sizeId?', () => {
  // respond with card by id
})
