import type { UserController } from '../../controllers/users/index.ts';
import { Router, type Response, type Request, type NextFunction } from 'express';

const createUsersRouter = (controller: UserController) => {
  const router = Router();

  router.get('/:id', async function(req: Request, res: Response, next: NextFunction) {
    await controller.getAllUsers(req, res, next);
  });
  
  router.get('/', async function(req: Request, res: Response, next: NextFunction) {
    await controller.getAllUsers(req, res, next);
  });

  router.post('/', async function(req: Request, res: Response, next: NextFunction) {
    await controller.createUser(req, res, next);
  });

  return router;
} 



export default createUsersRouter;