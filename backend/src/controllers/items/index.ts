import { type Response, type Request, type NextFunction } from 'express';
import type { ItemsService } from '../../services/items/itemsService.ts';


export class ItemsController {
  private itemsService: ItemsService;

  constructor(itemsService: ItemsService) {
    this.itemsService = itemsService;
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
        const itemData = req.body;
        const newAuthor = await this.itemsService.createItem(itemData);

        res.status(200).json(newAuthor);
    } catch (error) {
        next(error);
    }
  }
}
