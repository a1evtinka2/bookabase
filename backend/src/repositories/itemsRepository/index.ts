import pool, { db } from "../../database/index.ts";
import { AppError } from "../../models/error.ts";
import type { ItemData, ItemType, ItemTypeExt } from "../../models/items.ts";

export class ItemsRepository {

  async getAllItems(): Promise<ItemTypeExt[]> {
    try {
      const result = await db.query(
        `SELECT 
          items.id,
          items."authorId",
          items.type,
          items.title,
          items."normalizedTitle",
          items."createdAt",
          authors."firstName",
          authors.surname
         FROM items 
         JOIN authors ON items."authorId"=authors.id`);
      return result.rows;
    } catch (error: any) {
      throw new Error(`Error fetching items: ${error.message}`);
    }
  }

    async getItem(id: string): Promise<ItemTypeExt> {
    try {
      const result = await db.query(
        `SELECT 
          items.id,
          items."authorId",
          items.type,
          items.title,
          items."normalizedTitle",
          items."createdAt",
          authors."firstName",
          authors.surname
         FROM items 
         JOIN authors ON items."authorId"=authors.id
         WHERE items.id = $1`, 
         [id]);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(`Error fetching items: ${error.message}`);
    }
  }

  async create(item: ItemType): Promise<ItemType> {
    try {
      const { id, title, normalizedTitle, type, authorId} = item; 
      const result = await db.query(
        `INSERT INTO items (id, title, "normalizedTitle", type, "authorId") 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`, 
         [id, title, normalizedTitle, type, authorId]);
      return result.rows[0];
    } catch (error: any) {
      let message = "Items Database Error";
      let code = 500;
      console.log(error);
      
      
      if ("code" in error) {
        switch(error?.code) {
          case '23505':  
          code = 409;
          message = 'Item already exists';
          break;
          default: break;
        }
      }
      throw new AppError(code, message);
    }
  }
}