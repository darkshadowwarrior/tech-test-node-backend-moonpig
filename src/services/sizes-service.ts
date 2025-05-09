import { Size } from "../types/size";

export const sizesService = async (): Promise<Array<Size>> => {
    return new Promise<Array<Size>>(function(resolve, reject) {
        resolve([{
          id: '',
          title: '',
          priceMultiplier: 0
        }]);
      })
}