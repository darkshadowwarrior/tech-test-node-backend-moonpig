import { Template } from '../types/template';
import axios from 'axios';

export const templatesService = async (): Promise<Array<Template>> => {
    return axios.get('https://moonpig.github.io/tech-test-node-backend/templates.json').then(function (res) {
        return res.data;
    }).catch(function(err) {
        console.log(err)
    });
}