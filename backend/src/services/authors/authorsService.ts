import { randomUUID } from "node:crypto";
import type { AuthorsRepository } from "../../repositories/authorsRepository/index.ts";
import type { AuthorsData } from "../../models/authors.ts";

export class AuthorsService {
  private authorsRepository: AuthorsRepository;

  constructor(authorsRepository: AuthorsRepository) {
    this.authorsRepository = authorsRepository;
  }

  fetchAuthors = async () => {
    const allAuthors = await this.authorsRepository.getAllAuthors();
    return allAuthors;
  }

  fetchAuthor = async (id: string) => {
    const author = await this.authorsRepository.getAuthor(id);
    return author;
  }

  deleteAuthor = async (id: string) => {
    const deleted = await this.authorsRepository.deleteAuthor(id);
    return deleted;
  }

  createAuthor = async (authorData: AuthorsData) => {
    const { firstName, surname } = authorData;
    const fullName = surname ? `${firstName} ${surname}` : firstName;

    const normalizedName = fullName?.split(' ').filter((s) => s !== '').join(' ').toLowerCase(); 

    const id = randomUUID();
    
    const authorToCreate = {
      ...authorData,
      id,
      normalizedName,
    };
    const newAuthor = await this.authorsRepository.create(authorToCreate);
    return newAuthor;
  }
}
