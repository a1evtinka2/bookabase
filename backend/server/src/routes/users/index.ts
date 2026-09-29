import { Router, type Response, type Request } from 'express';
import type { UserController } from '../../controllers/users/index.ts';

const createUsersRouter = (controller: UserController) => {
  const router = Router();

  router.get('/', async function(req: Request, res: Response) {
    await controller.getAllUsers(req, res);
  });
  
  router.get('/list', function(req: Request, res: Response) {
    res.send('List of APIv1 users.');
  });

  return router;
} 



export default createUsersRouter;