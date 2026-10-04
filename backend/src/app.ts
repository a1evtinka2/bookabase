import express, { type Express } from 'express';
import cors from 'cors';
import createUsersRouter from './routes/users/index.ts'
import { UserService } from './services/users/userService.ts';
import { UserController } from './controllers/users/index.ts';
import { UserRepository } from './repositories/userRepository/index.ts';
import errorHandler from './middlewares/errorHandler.ts';
import { AuthorsRepository } from './repositories/authorsRepository/index.ts';
import { AuthorsService } from './services/authors/authorsService.ts';
import { AuthorsController } from './controllers/authors/index.ts';
import createAuthorsRouter from './routes/authors/index.ts';
import { ItemsRepository } from './repositories/itemsRepository/index.ts';
import { ItemsService } from './services/items/itemsService.ts';
import { ItemsController } from './controllers/items/index.ts';
import createItemsRouter from './routes/items/index.ts';

const app: Express = express();

const userRepository = new UserRepository();
const authorsRepository = new AuthorsRepository();
const itemsRepository = new ItemsRepository();

const userService =  new UserService(userRepository);
const authorsService =  new AuthorsService(authorsRepository);
const itemsService =  new ItemsService(itemsRepository);

const userController = new UserController(userService)
const authorsController = new AuthorsController(authorsService)
const itemsController = new ItemsController(itemsService)

const userRouter = createUsersRouter(userController)
const authorsRouter = createAuthorsRouter(authorsController)
const itemsRouter = createItemsRouter(itemsController)

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST', 
    allowedHeaders: 'Content-Type,Authorization' 
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/users', userRouter);
app.use('/authors', authorsRouter);
app.use('/items', itemsRouter);

app.use(errorHandler);

process.on('exit', (code) => {
  console.log('NODE EXITING, CODE:', code);
});

app.listen(process.env.PORT, () => {
  console.log(`Bookabase app listening on port ${process.env.PORT}`);
});