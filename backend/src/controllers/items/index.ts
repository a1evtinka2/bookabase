import { type Response, type Request, type NextFunction } from 'express';
import type { ItemsService } from '../../services/items/itemsService.ts';
import type { ItemData, ItemWithAuthorData } from '../../models/items.ts';
import type { AuthorsService } from '../../services/authors/authorsService.ts';
import type { Author } from '../../models/authors.ts';


export class ItemsController {
  private itemsService: ItemsService;
  private authorsService: AuthorsService;


  constructor(
    itemsService: ItemsService, 
    authorsService: AuthorsService) {
    this.itemsService = itemsService;
    this.authorsService = authorsService;
  }

  public async getAllItems(
    req: Request, 
    res: Response, 
    next: NextFunction) {
    try {
        const items = await this.itemsService.fetchItems();
        
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
  }

    public async getItemById(
        req: Request<{ id: string }>, 
        res: Response, 
        next: NextFunction) {
    try {
        const { id } = req.params;

        const item = await this.itemsService.fetchItem(id);
        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
  }

  public async createItem(
    req: Request, 
    res: Response, 
    next: NextFunction) {
    try {
        const itemData: ItemData = req.body;
        const newItem = await this.itemsService.createItem(itemData);

        res.status(200).json(newItem);
    } catch (error) {
        next(error);
    }
  }

    public async createItemWithNewAuthor(
    req: Request, 
    res: Response, 
    next: NextFunction) {
    try {
        const itemData: ItemWithAuthorData = req.body;
        
        const newAuthor: Author = await this.authorsService.createAuthor(itemData.author);
        if (newAuthor) {
          const newItemData: ItemData = {
            authorId: newAuthor.id,
            type: itemData.type,
            title: itemData.title,
          }
          const newItem = await this.itemsService.createItem(newItemData)
          res.status(200).json(newItem);
        }

    } catch (error) {
        next(error);
    }
  }
}
