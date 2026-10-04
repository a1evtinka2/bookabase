export enum ItemTypesEnum {
    Book = 'book',
    Film = 'film',
}

export interface Item {
    id: string,
    authorId: string,
    type: ItemTypesEnum,
    title: string,
    normalizedTitle: string,
    firstName: string,
    surname:string,
    createdAt: string,
}