import { Router, type Response, type Request, type NextFunction } from 'express';
import type { ItemsController } from '../../controllers/items/index.ts';

const createItemsRouter = (controller: ItemsController) => {
  const router = Router();

  /**
  * @swagger
  * components:
  *   schemas:
  *     Author:
  *       required:
  *         - firstName
  *       properties:
  *         firstName: 
  *           type: string 
  *         surname:
  *           type: string
  * 
  *     Item:
  *       required:
  *         - authorId
  *         - type
  *         - title
  *         - id
  *         - author
  *       properties:
  *         authorId:
  *           type: string
  *           format: uuid
  *         type:
  *           type: string
  *           enum: [book, film]
  *         title:
  *           type: string
  *         id:
  *           type: string
  *           format: uuid
  *         author:
  *           type: object
  *           $ref: '#/components/schemas/Author'
  * 
  *     ItemCreateWithNewAuthor:
  *       required:
  *         - author
  *         - type
  *         - title
  *       properties:
  *         author: 
  *           type: object
  *           $ref: '#/components/schemas/Author'
  *         type:
  *           type: string
  *           enum: [book, film]
  *         title:
  *           type: string
  * 
  *     ItemCreate:
  *       required:
  *         - authorId
  *         - type
  *         - title
  *       properties:
  *         authorId: 
  *           type: string 
  *           format: uuid
  *         type:
  *           type: string
  *           enum: [book, film]
  *         title:
  *           type: string
 */  

/**
  * @swagger
  * tags:
  *   Items
  */

/**
  * @swagger
  * /items:
  *   get:
  *     tags:
  *       - Items
  *     summary: Retrieve a list of items
  *     responses:
  *       '200':
  *         description: A list of items
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/Item'
  * 
  */
  router.get('/', async function(req: Request, res: Response, next: NextFunction) {
    await controller.getAllItems(req, res, next);
  });

/**
  * @swagger
  * /items/{id}:
  *   get:
  *     tags:
  *       - Items
  *     summary: Retrieve a list of items
  *     parameters:
  *      - in: path
  *        name: id
  *        schema:
  *          type: string
  *          format: uuid
  *        required: true
  *        description: UUID of the item to get
  *     responses:
  *       '200':
  *         description: Get an item by id
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Item'
  * 
  */
  router.get('/:id', async function(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    await controller.getItemById(req, res, next);
  });

/**
  * @swagger
  * /items:
  *   post:
  *     tags:
  *       - Items
  *     summary: Create an item
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: "#/components/schemas/ItemCreate"
  *     responses:
  *       '200':
  *         description: Item created
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Item'
  * 
  */
  router.post('/', async function(req: Request, res: Response, next: NextFunction) {
    await controller.createItem(req, res, next);
  });

  /**
  * @swagger
  * /items/with-new-author:
  *   post:
  *     tags:
  *       - Items
  *     summary: Create an item with new author
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: "#/components/schemas/ItemCreateWithNewAuthor"
  *     responses:
  *       '200':
  *         description: Item created with new author
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Item'
  * 
  */
  router.post('/with-new-author', async function(req: Request, res: Response, next: NextFunction) {
    await controller.createItemWithNewAuthor(req, res, next);
  });

  return router;
} 



export default createItemsRouter;