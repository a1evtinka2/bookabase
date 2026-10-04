import { randomUUID } from "node:crypto";
import type { ItemsRepository } from "../../repositories/itemsRepository/index.ts";
import type { ItemData } from "../../models/items.ts";

export class ItemsService {
  private itemsRepository: ItemsRepository;

  constructor(itemsRepository: ItemsRepository) {
    this.itemsRepository = itemsRepository;
  }

  fetchItems = async () => {
    const allItems = await this.itemsRepository.getAllItems();
    console.log(allItems);
    
    return allItems;
  }

  fetchItem = async (id: string) => {
    const item = await this.itemsRepository.getItem(id);
    
    return item;
  }

  createItem = async (itemData: ItemData) => {
    const title = itemData.title;
    
    const normalizedTitle = title?.split(' ').filter((s) => s !== '').join(' ').toLowerCase(); 

    const id = randomUUID();
    
    const itemToCreate = {
      ...itemData,
      id,
      normalizedTitle,
    };
    const newItem = await this.itemsRepository.create(itemToCreate);
    return newItem;
  }
}
