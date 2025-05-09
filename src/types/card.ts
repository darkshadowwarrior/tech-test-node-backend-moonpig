export type Card = {
    id: string;
    title: string;
    sizes: Array<string>,
    basePrice: number,
    pages: Array<Page>
}

type Page = {
    title: string;
    templateId: string;
}