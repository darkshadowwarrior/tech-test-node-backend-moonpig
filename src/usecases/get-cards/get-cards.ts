import { cardsService } from "../../services/card-service";
import { templatesService } from "../../services/template-service";

export const getCards = async () => {
    try {
        const [cards, templates] = await Promise.all([cardsService(), templatesService()]);

        return cards.map(card => {
            const template = templates.find(template => template.id == card.pages[0].templateId);

            return {
                title: card.title,
                imageUrl: template.imageUrl,
                url: `card/${card.id}`
            }
        })
    } catch (err) {
        throw new Error("Unable to fetch cards");
    }
}