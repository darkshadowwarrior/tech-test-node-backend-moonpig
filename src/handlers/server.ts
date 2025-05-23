import express from "express";
import { getCards } from "../usecases/get-cards/get-cards";
import { getCardById } from "../usecases/get-card-by-id/get-card-by-id";

export const app = express();

app.set('json spaces', 2);

app.get('/cards', async (req, res) => {
  // respond with a list of cards
  const cards = await getCards();
  res.status(200).send(cards);
})

app.get('/cards/:cardId/:sizeId?', async (req, res, next) => {
  // respond with card by id
  const params = req.params;
  try {
    const card = await getCardById(params.cardId, params.sizeId);
    res.status(200).send(card);
  } catch (err) {
    res.status(500).send({error: err.message});
  }
})
