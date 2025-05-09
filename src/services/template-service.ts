import { Template } from '../types/template';


export const templatesService = async (): Promise<Array<Template>> => {
    return new Promise<Array<Template>>(function(resolve, reject) {
        resolve([{
            id: '',
            width: 0,
            height: 0,
            imageUrl: ''
        }]);
      })
}