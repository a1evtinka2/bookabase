import express, { type Express, type Request, type Response } from 'express';
import dotenv from 'dotenv';
import createUsersRouter from './routes/users/index.ts'
import items from './routes/items/index.ts'
import { UserService } from './services/userService.ts';
import { UserController } from './controllers/users/index.ts';

dotenv.config();

const app: Express = express();

const userService =  new UserService()
const userController = new UserController(userService)

const userRouter = createUsersRouter(userController)

app.use('/users', userRouter);
app.use('/items', items);


app.get('/', (req: Request, res: Response) => {
  res.send('Root Route!');
});

app.listen(process.env.PORT, () => {
  console.log(`Bookabase app listening on port ${process.env.PORT}`);
});