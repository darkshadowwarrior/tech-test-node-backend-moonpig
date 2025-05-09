import { Size } from "../types/size";
import axios from 'axios';

export const sizesService = async (): Promise<Array<Size>> => {
  return axios.get('https://moonpig.github.io/tech-test-node-backend/sizes.json').then(function (res) {
    return res.data;
}).catch(function(err) {
    console.log(err)
});
}