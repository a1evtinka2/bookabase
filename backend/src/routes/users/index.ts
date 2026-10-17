import type { UserController } from '../../controllers/users/index.ts';
import { Router, type Response, type Request, type NextFunction } from 'express';

const createUsersRouter = (controller: UserController) => {
  const router = Router();
/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */
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