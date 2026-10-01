import { Router, type Response, type Request } from 'express';

const items = Router();

items.get('/', function(req: Request, res: Response) {
  res.send('Hello from items root route.');
});

items.get('/list', function(req: Request, res: Response) {
  res.send('List of APIv1 items.');
});

export default items;
