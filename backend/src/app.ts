import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import createUsersRouter from './routes/users/index.ts'
import items from './routes/items/index.ts'
import { UserService } from './services/userService.ts';
import { UserController } from './controllers/users/index.ts';
import pool from './database/index.ts'
import { UserRepository } from './repositories/userRepository/index.ts';
import errorHandler from './middlewares/errorHandler.ts';

// dotenv.config();

const app: Express = express();

const userRepository = new UserRepository();
const userService =  new UserService(userRepository);
const userController = new UserController(userService)

const userRouter = createUsersRouter(userController)

pool.query(`
  SELECT current_database(), current_user, current_schema()
`)
  .then((result: any) => {
    console.log('DB identity:', result.rows[0]);
  })
  .catch((error: any) => {
    console.error('DB connection test failed:', error);
  });

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE', 
    allowedHeaders: 'Content-Type,Authorization' 
};

app.use(cors(corsOptions));
app.use(express.json());


app.use('/users', userRouter);
app.use('/items', items);

app.use(errorHandler);


app.get('/', (req: Request, res: Response) => {
  res.send('Root Route!');
});

app.listen(process.env.PORT, () => {
  console.log(`Bookabase app listening on port ${process.env.PORT}`);
});