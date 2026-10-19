import type { UserService } from '../../services/users/userService.ts';
import { type Response, type Request, type NextFunction } from 'express';


export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async getAllUsers(
    req: Request, 
    res: Response, 
    next: NextFunction) {
    try {
        const users = await this.userService.fetchUsers();

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
  }

    public async getUserById(
    req: Request<{ id: string }>, 
    res: Response, 
    next: NextFunction) {
    try {
        const { id } = req.params;

        const users = await this.userService.fetchUserById(id);

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userData = req.body;
        const newUser = await this.userService.createUser(userData);
        
        res.status(200).json(newUser);
    } catch (error) {
        next(error);
    }
  }
}
