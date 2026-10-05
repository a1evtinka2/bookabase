import pool, { db } from "../../database/index.ts";
import type { Author } from "../../models/authors.ts";
import { AppError } from "../../models/error.ts";

export class AuthorsRepository {

  async getAllAuthors(): Promise<Author[]> {
    try {
      const result = await db.query(
        `SELECT id, "firstName", surname FROM authors`);
      return result.rows;
    } catch (error: any) {
      throw new Error(`Error fetching authors: ${error.message}`);
    }
  }

    async getAuthor(id: string): Promise<Author> {
    try {
      const result = await db.query(
        `SELECT * FROM authors WHERE id = $1`, [id]);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(`Error fetching author: ${error.message}`);
    }
  }

    async deleteAuthor(id: string): Promise<boolean> {
    try {
      await db.query(
        `DELETE FROM authors WHERE id = $1`, [id]);
      return true;
    } catch (error: any) {
      throw new Error(`Error deleting author: ${error.message}`);
    }
  }

  async create(author: Author) {
    try {
      const { id, firstName, surname, normalizedName} = author; 
      const result = await db.query(
        `INSERT INTO authors (id, "firstName", "surname", "normalizedName") 
         VALUES ($1, $2, $3, $4) 
         RETURNING *`, 
         [id, firstName, surname, normalizedName]);
      return result.rows[0];
    } catch (error: any) {
      let message = "Author Database Error";
      let code = 500;
      console.log(error);
      
      
      if ("code" in error) {
        switch(error?.code) {
          case '23505':  
          code = 409;
          message = 'Author already exists';
          break;
          default: break;
        }
      }
      throw new AppError(code, message);
    }
  }
}