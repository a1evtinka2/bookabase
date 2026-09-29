import { type Response, type Request } from 'express';
import type { UserService } from '../../services/userService.ts';


export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
        const users = await this.userService.fetchUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error)
    }
  }
}
