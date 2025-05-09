import { getCards } from "../get-cards";
import { Card } from "../../../types/card";
import { cardsService } from "../../../services/card-service";
import { templatesService } from "../../../services/template-service";
import { mocked } from 'jest-mock';
import { mockDeep } from 'jest-mock-extended';

jest.mock('../../../services/card-service');
jest.mock('../../../services/template-service');

const mockCardService = mocked(cardsService);
const mockTemplatesService = mocked(templatesService);

describe('getCards', () => {
    test('should return all cards fetched', async () => {
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
      }]));

      mockTemplatesService.mockResolvedValue([
        {
          "id": "template001",
          "width": 300,
          "height": 600,
          "imageUrl": "/front-cover-portrait-1.jpg"
        }
      ]);
      
      const received = await getCards();

      expect(received[0]).toEqual({
        imageUrl: "/front-cover-portrait-1.jpg",
        title: "card 1 title",
        url: "card/card001",
      });
    })

    test('should catch and rethrow error if card service errors', async () => {
      mockCardService.mockRejectedValue(new Error("card service returned 500"));

      expect(getCards).rejects.toEqual(new Error("Unable to fetch cards"));
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
      }]));

      mockTemplatesService.mockRejectedValue(new Error("template service returned 500"));
      
      expect(getCards).rejects.toEqual(new Error("Unable to fetch cards"));
    })
})