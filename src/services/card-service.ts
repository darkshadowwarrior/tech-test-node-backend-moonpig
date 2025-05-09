import { Card } from '../types/card';
import axios from 'axios';

export const cardsService = async (): Promise<Array<Card>> => {
    return axios.get('https://moonpig.github.io/tech-test-node-backend/cards.json').then(function (res) {
        return res.data;
    }).catch(function(err) {
        console.log(err);
    });
}