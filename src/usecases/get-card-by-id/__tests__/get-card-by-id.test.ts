import { mocked } from 'jest-mock'
import { cardsService } from '../../../services/card-service';
import { templatesService } from '../../../services/template-service';
import { getCardById } from '../get-card-by-id';
import { mockDeep } from 'jest-mock-extended';
import { Card } from '../../../types/card';

jest.mock('../../../services/card-service')
jest.mock('../../../services/template-service')

const mockCardService = mocked(cardsService);
const mockTemplatesService = mocked(templatesService);

describe('getCardById', () => {
    test('should return the correct card by the given id', async () => {
        mockCardService.mockResolvedValue([
            {
              "id": "card001",
              "title": "card 1 title",
              "sizes": ["sm", "md", "gt"],
              "basePrice": 200,
              "pages": [
                {
                  "title": "Front Cover",
                  "templateId": "template001"
                },
                {
                  "title": "Inside Left",
                  "templateId": "template002"
                },
                {
                  "title": "Inside Right",
                  "templateId": "template003"
                },
                {
                  "title": "Back Cover",
                  "templateId": "template004"
                }
              ]
            }
          ])
    
          mockTemplatesService.mockResolvedValue([
                {
                "id": "template001",
                "width": 300,
                "height": 600,
                "imageUrl": "/front-cover-portrait-1.jpg"
                },
                {
                "id": "template002",
                "width": 300,
                "height": 600,
                "imageUrl": ""
                },
                {
                "id": "template003",
                "width": 300,
                "height": 600,
                "imageUrl": ""
                },
                {
                "id": "template004",
                "width": 300,
                "height": 600,
                "imageUrl": "/back-cover-portrait.jpg"
                }
            ]
          )

          const cardId = "card001";

          const received = await getCardById(cardId);

          expect(received).toEqual({
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
          });
    })

    test('should catch and rethrow error if card service errors', async () => {
      mockCardService.mockRejectedValue(new Error("card service returned 500"));

      expect(getCardById('card001')).rejects.toEqual(new Error("Failed to get card for cardId: card001"));
    })

    test('should catch and rethrow error if template service errors', async () => {
      mockCardService.mockResolvedValue(mockDeep<Array<Card>>([{
        "id": "card001",
        "title": "card 1 title",
        "pages": [
          {
            "title": "Front Cover",
            "templateId": "template001"
          },
          {
            "title": "Inside Left",
            "templateId": "template002"
          },
          {
            "title": "Inside Right",
            "templateId": "template003"
          },
          {
            "title": "Back Cover",
            "templateId": "template004"
          }
        ]
      }]))

      mockTemplatesService.mockRejectedValue(new Error("template service returned 500"));
      
      expect(getCardById('card001')).rejects.toEqual(new Error("Failed to get card for cardId: card001"));
    })
})
