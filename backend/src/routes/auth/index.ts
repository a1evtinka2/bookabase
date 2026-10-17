import type { AuthController } from '../../controllers/auth/index.ts';
import { Router, type Response, type Request, type NextFunction } from 'express';

const createAuthRouter = (controller: AuthController) => {
  const router = Router();

  router.post('/login', async function(req: Request, res: Response, next: NextFunction) {


    await controller.login(req, res, next);
  });

  router.post('/register', async function(req: Request, res: Response, next: NextFunction) {
    await controller.register(req, res, next);
  });

  router.get('/google', async function(req: Request, res: Response, next: NextFunction) {
    await controller.initAuthWithGoogle(req, res, next);
  });

  router.get('/google/callback', async function(req: Request, res: Response, next: NextFunction) {
    await controller.authWithGoogle(req, res, next);
  });

  router.get('/logout', async function(req: Request, res: Response, next: NextFunction) {
    await controller.logout(req, res, next);
  });
  
  return router;
} 


export default createAuthRouter;