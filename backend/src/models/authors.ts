export interface AuthorsData {
    firstName: string;
    surname: string,
}

export interface Author extends AuthorsData {
    id: string;
    normalizedName: string,
}

