import { cardsService } from "../../services/card-service"
import { templatesService } from "../../services/template-service"

export const getCardById = async (cardId: string, sizeId?: string) => {
    try {
        const [cards, templates] = await Promise.all([
            cardsService(),
            templatesService()
        ]);

        const card = cards.find(card => card.id === cardId);
        const pages = card.pages.map(page => templates.find(temp => temp.id === page.templateId));

        return {
            title: card.title,
            price: card.basePrice,
            availableSizes: card.sizes,
            imageUrl: pages[0].imageUrl,
            pages
        }
        
    } catch (err) {
        if (sizeId) {
            throw new Error(`Failed to get card for cardId: ${cardId} with sizeId: ${sizeId}`)
        }
        throw new Error(`Failed to get card for cardId: ${cardId}`)
    }
}