import type { AuthorsController } from '../../controllers/authors/index.ts';
import { Router, type Response, type Request, type NextFunction } from 'express';

const createAuthorsRouter = (controller: AuthorsController) => {
  const router = Router();

  router.get('/:id', async function(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    await controller.getAllAuthors(req, res, next);
  });

  router.delete('/:id', async function(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    await controller.deleteAuthorById(req, res, next);
  });
  
  router.get('/', async function(req: Request, res: Response, next: NextFunction) {
    await controller.getAllAuthors(req, res, next);
  });

  router.post('/', async function(req: Request, res: Response, next: NextFunction) {
    await controller.createAuthor(req, res, next);
  });

  return router;
} 



export default createAuthorsRouter;