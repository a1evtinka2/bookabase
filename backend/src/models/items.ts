import type { AuthorsData } from "./authors.ts";

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

export interface ItemTypeExt extends ItemType {
   createdAt: string,
   surname: string,
   firstName: string,
}

export interface ItemWithAuthorType extends ItemType {
   author: AuthorsData,
}