import type { AuthData, RegistrationData } from '../../models/auth.ts';
import type { AuthService } from '../../services/auth/index.ts';
import { type Response, type Request, type NextFunction } from 'express';


export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }


  public async login(
        req: Request, 
        res: Response, 
        next: NextFunction) {
    try {
        const authData: AuthData = req.body;

        const deleted = await this.authService.login(authData);
        res.status(200).json(deleted);
    } catch (error) {
        next(error);
    }
  }

  public async register(
    req: Request, 
    res: Response, 
    next: NextFunction) {
    try {
        const authData: RegistrationData = req.body;
        const newAuthor = await this.authService.register(authData);

        res.status(200).json(newAuthor);
    } catch (error) {
        next(error);
    }
  }
}
