import { cardsService } from "../../services/card-service"
import { sizesService } from "../../services/sizes-service";
import { templatesService } from "../../services/template-service"
import { formatAmountInPounds } from "../../helpers/format-amount-in-pounds";

export const getCardById = async (cardId: string, sizeId?: string) => {
    try {
        const [cards, templates, sizes] = await Promise.all([
            cardsService(),
            templatesService(),
            sizesService()
        ]);

        const card = cards.find(card => card.id === cardId);
        const pages = card.pages.map(page => templates.find(temp => temp.id === page.templateId));
        let completedCard = { 
            title: card.title,
            imageUrl: pages[0].imageUrl,
            pages
        };

        if(sizeId) {
            const selectedSize = sizes.find(size => size.id === sizeId);
            const price = formatAmountInPounds((card.basePrice * selectedSize.priceMultiplier) / 100);

            const availableSizes = card.sizes.map((size) => sizes.find(cardSize => {
                if(cardSize.id == size) {
                    delete cardSize.priceMultiplier
                    return cardSize
                }
            }));
            
            return {
                ...completedCard,
                size: sizeId,
                availableSizes,
                price
            }
        }

        return {
            ...completedCard,
            price: formatAmountInPounds(card.basePrice / 100),
            availableSizes: card.sizes
        }

        
    } catch (err) {
        if (sizeId) {
            throw new Error(`Failed to get card for cardId: ${cardId} with sizeId: ${sizeId}`)
        }
        throw new Error(`Failed to get card for cardId: ${cardId}`)
    }
}