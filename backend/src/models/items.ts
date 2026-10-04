export enum ItemTypeEnum {
    Book = "book", 
    Film = "film",
}

export interface ItemData {
    authorId: string,
    type: ItemTypeEnum,
    title: string,
}

export interface ItemType extends ItemData {
    id: string,
    normalizedTitle: string,
}