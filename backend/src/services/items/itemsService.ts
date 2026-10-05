import { randomUUID } from "node:crypto";
import type { ItemsRepository } from "../../repositories/itemsRepository/index.ts";
import type { ItemData, ItemType, ItemTypeExt, ItemWithAuthorType } from "../../models/items.ts";

export class ItemsService {
  private itemsRepository: ItemsRepository;

  constructor(itemsRepository: ItemsRepository) {
    this.itemsRepository = itemsRepository;
  }
  private formatItems = (items: ItemTypeExt[]): ItemWithAuthorType[] => {
    const itemsWithAuthor = items.map((i) => {
      return {
        ...i,
        author: {
          firstName: i.firstName,
          surname: i.surname,
        }
      }
    })
      
    return itemsWithAuthor;
  }

  fetchItems = async () => {
    const rawItems = await this.itemsRepository.getAllItems();
    const formattedItems = this.formatItems(rawItems);
    console.log(formattedItems);
    
    return formattedItems;
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
