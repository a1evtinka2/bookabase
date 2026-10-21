import type { AuthorsController } from '../../controllers/authors/index.ts';
import { Router, type Response, type Request, type NextFunction } from 'express';

const createAuthorsRouter = (controller: AuthorsController) => {
  const router = Router();
  
  /**
  * @swagger
  * components:
  *   schemas:
  *     CreateAuthor:
  *       required:
  *         - firstName
  *       properties:
  *         firstName: 
  *           type: string 
  *         surname:
  *           type: string
  * 
  *     Author:
  *       required:
  *         - firstName
  *         - id
  *       properties:
  *         id: 
  *           type: string 
  *           format: uuid
  *         normalizedName: 
  *           type: string 
  *         firstName: 
  *           type: string 
  *         surname:
  *           type: string
 */  

/**
  * @swagger
  * /authors:
  *   get:
  *     tags:
  *       - Authors
  *     summary: Retrieve a list of authors
  *     responses:
  *       '200':
  *         description: A list of authors
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/Author'
  * 
  */
  router.get('/', async function(req: Request, res: Response, next: NextFunction) {
    await controller.getAllAuthors(req, res, next);
  });

  router.get('/:id', async function(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    await controller.getAllAuthors(req, res, next);
  });

  router.delete('/:id', async function(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    await controller.deleteAuthorById(req, res, next);
  });
  

/**
  * @swagger
  * /authors:
  *   post:
  *     tags:
  *       - Authors
  *     summary: Create an author
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: "#/components/schemas/CreateAuthor"
  *     responses:
  *       '200':
  *         description: Item created
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Author'
  * 
  */
  router.post('/', async function(req: Request, res: Response, next: NextFunction) {
    await controller.createAuthor(req, res, next);
  });

  return router;
} 



export default createAuthorsRouter;