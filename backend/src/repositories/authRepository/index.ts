import { db } from "../../database/index.ts";
import type { AuthData, AuthIdentitiesData, OpenIdTokenData, RegistrationData } from "../../models/auth.ts";
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

  async findUserInAuthIdentities(openIdTokenData: OpenIdTokenData): Promise<null | string> {
    try {
      const { issuer, subject } = openIdTokenData; 
      const result = await db.query(
        `SELECT "userId"
         FROM auth_identities
         WHERE issuer = $1 AND subject = $2;`, [issuer, subject]);
      return result.rows[0] ?? null;
    } catch (error: any) {
      throw new AppError(error.code, error.message);
    }
  }

  async addUserInAuthIdentities(authIdentitiesData: AuthIdentitiesData): Promise<null | string> {
    try {
      const { id, userId, issuer, subject } = authIdentitiesData; 
      const result = await db.query(
        `INSERT INTO auth_identities (id, "userId", issuer, subject) 
         VALUES ($1, $2, $3, $4) 
         RETURNING *`, 
         [id, userId, issuer, subject]);
      return result.rows[0] ?? null;
    } catch (error: any) {
      throw new AppError(error.code, error.message);
    }
  }
}