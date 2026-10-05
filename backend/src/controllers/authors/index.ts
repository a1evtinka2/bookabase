import type { AuthorsService } from '../../services/authors/authorsService.ts';
import { type Response, type Request, type NextFunction } from 'express';


export class AuthorsController {
  private authorsService: AuthorsService;

  constructor(authorsService: AuthorsService) {
    this.authorsService = authorsService;
  }

  public async getAllAuthors(
    req: Request, 
    res: Response, 
    next: NextFunction) {
    try {
        const authors = await this.authorsService.fetchAuthors();
        
        res.status(200).json(authors);
    } catch (error) {
        next(error);
    }
  }

  public async getAuthorById(
        req: Request<{ id: string }>, 
        res: Response, 
        next: NextFunction) {
    try {
        const { id } = req.params;

        const authors = await this.authorsService.fetchAuthor(id);
        res.status(200).json(authors);
    } catch (error) {
        next(error);
    }
  }

  public async deleteAuthorById(
        req: Request<{ id: string }>, 
        res: Response, 
        next: NextFunction) {
    try {
        const { id } = req.params;

        const deleted = await this.authorsService.deleteAuthor(id);
        res.status(200).json(deleted);
    } catch (error) {
        next(error);
    }
  }

  public async createAuthor(
    req: Request, 
    res: Response, 
    next: NextFunction) {
    try {
        const authorData = req.body;
        const newAuthor = await this.authorsService.createAuthor(authorData);

        res.status(200).json(newAuthor);
    } catch (error) {
        next(error);
    }
  }
}
