import { db } from "../../database/index.ts";
import type { AuthData, RegistrationData } from "../../models/auth.ts";
import { AppError } from "../../models/error.ts";

export class AuthRepository {

  async register(user: RegistrationData): Promise<AuthData> {
    try {
      const { password } = user; 
      const result = await db.query(
        `SELECT FROM auth_credentials 
         WHERE password = $1`, 
         [password]);
      return result.rows[0];
    } catch (error: any) {
      let message = "Items Database Error";
      let code = 500;
      console.log(error);
      
      
      if ("code" in error) {
        switch(error?.code) {
          case '23505':  
          code = 409;
          message = 'User already exists';
          break;
          default: break;
        }
      }
      throw new AppError(code, message);
    }
  }

    async login(user: AuthData): Promise<boolean> {
    try {
      const { nickname } = user; 
      const result = await db.query(
        `SELECT * FROM users 
         WHERE nickname = $1`, [nickname]);
      return result.rows[0];
    } catch (error: any) {
      throw new AppError(error.code, error.message);
    }
  }
}