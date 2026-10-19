import type { UserController } from '../../controllers/users/index.ts';
import { Router, type Response, type Request, type NextFunction } from 'express';

const createUsersRouter = (controller: UserController) => {
  const router = Router();

  /**
  * @swagger
  * components:
  *   schemas:
  *     User:
  *       required:
  *         - id
  *         - nickname
  *         - dateOfBirth
  *       properties:
  *         id: 
  *           type: string 
  *           format: uuid
  *         nickname:
  *           type: string
  *         dateOfBirth:
  *           type: string
  *     UserCreate:
  *       required:
  *         - nickname
  *         - dateOfBirth
  *       properties:
  *         nickname:
  *           type: string
  *         dateOfBirth:
  *           type: string
  * 
 */  

/**
  * @swagger
  * /users:
  *   get:
  *     tags:
  *       - Users
  *     summary: Retrieve a list of users
  *     responses:
  *       '200':
  *         description: A list of users
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/User'
  * 
  */
  router.get('/', async function(req: Request, res: Response, next: NextFunction) {
    await controller.getAllUsers(req, res, next);
  });

  /**
  * @swagger
  * /users/{id}:
  *   get:
  *     tags:
  *       - Users
  *     summary: Retrieve a user by id
  *     parameters:
  *      - in: path
  *        name: id
  *        schema:
  *          type: string
  *          format: uuid
  *        required: true
  *        description: UUID of the user to get
  *     responses:
  *       '200':
  *         description: Get a user by id
  *         content:
  *           application/json:
  *             schema:
  *                 $ref: '#/components/schemas/User'
  * 
  */
  router.get('/:id', async function(req: Request<{ id: string; }>, res: Response, next: NextFunction) {
    await controller.getUserById(req, res, next);
  });

/**
  * @swagger
  * /users:
  *   post:
  *     tags:
  *       - Users
  *     summary: Create a user
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: "#/components/schemas/UserCreate"
  *     responses:
  *       '200':
  *         description: User created
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/User'
  * 
  */
  router.post('/', async function(req: Request, res: Response, next: NextFunction) {
    await controller.createUser(req, res, next);
  });

  return router;
} 



export default createUsersRouter;