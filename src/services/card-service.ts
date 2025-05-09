import { Card } from '../types/card';


export const cardsService = async (): Promise<Array<Card>> => {
    return new Promise<Array<Card>>(function(resolve, reject) {
        resolve([{
            id: "",
            title: "",
            sizes: [""],
            basePrice: 0,
            pages: [{
                title: '',
                templateId: ''
            }]
        }]);
      })
}