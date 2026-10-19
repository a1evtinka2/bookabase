import { db } from "../../database/index.ts";
import { AppError } from "../../models/error.ts";
import type { User } from "../../models/user.ts";

export class UserRepository {

  async getAllUsers(): Promise<User[]> {
    try {
      
      const result = await db.query(
        `SELECT
          users.id,
          users.nickname,
          users."dateOfBirth"   
         FROM users`);

      return result.rows;
    } catch (error: any) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  async getUser(userId: string): Promise<User> {
    try {
      
      const result = await db.query(
        `SELECT
          users.id,
          users.nickname,
          users."dateOfBirth"    
        FROM users
        WHERE id=$1`, [userId]);

      return result.rows[0];
    } catch (error: any) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  async create(user: User) {
    try {
      const { id, nickname, dateOfBirth } = user; 
      const result = await db.query(
        `INSERT INTO users (id, nickname, "dateOfBirth") 
         VALUES ($1, $2, $3) 
         RETURNING *`, 
         [id, nickname, dateOfBirth]);
      return result.rows[0];
    } catch (error: any) {
      let message = "User Database Error";
      let code = 500;
      console.log(error);
      
      
      if ("code" in error) {
        switch(error?.code) {
          case '22007':  
          code = 400;
          message = 'Invalid date of birth';
          break;
          case '23505':  
          code = 409;
          message = 'Nickname already exists';
          break;
          default: break;
        }
      }
      throw new AppError(code, message);
    }
  }
}