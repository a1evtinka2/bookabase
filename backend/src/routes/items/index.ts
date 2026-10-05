import { Router, type Response, type Request, type NextFunction } from 'express';
import type { ItemsController } from '../../controllers/items/index.ts';

const createItemsRouter = (controller: ItemsController) => {
  const router = Router();

  router.get('/', async function(req: Request, res: Response, next: NextFunction) {
    await controller.getAllItems(req, res, next);
  });

  router.get('/:id', async function(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    await controller.getItemById(req, res, next);
  });


  router.post('/', async function(req: Request, res: Response, next: NextFunction) {
    await controller.createItem(req, res, next);
  });

  return router;
} 



export default createItemsRouter;