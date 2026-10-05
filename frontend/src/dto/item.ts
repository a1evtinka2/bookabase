export enum ItemTypesEnum {
  Book = 'book',
  Film = 'film',
}

export interface AuthorData {
  firstName: string;
  surname: string;
}

export interface Item {
  id: string;
  authorId: string;
  type: ItemTypesEnum;
  title: string;
  normalizedTitle: string;
  author: AuthorData;
}
