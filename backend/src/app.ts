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
import { AuthRepository } from './repositories/authRepository/index.ts';
import { AuthService } from './services/auth/index.ts';
import { AuthController } from './controllers/auth/index.ts';
import createAuthRouter from './routes/auth/index.ts';
import * as client from 'openid-client';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import getRequiredEnv from './helpers/getRequiredEnv.ts';

const app: Express = express();

app.use(cookieParser());

app.use(session({
    secret: getRequiredEnv('SESSION_SECRET'),
    saveUninitialized: false,
    resave: false,
    cookie: function (req) {
      return {
        httpOnly: true,
        secure: req.secure || false,
        maxAge: 60000,
      };
    },
}));

const google = new URL( 'https://accounts.google.com' );
let serverMy: URL = google;
let clientId: string = process.env.GOOGLE_CLIENT_ID || '';
let clientSecret: string = process.env.GOOGLE_CLIENT_SECRET || '';

let config: client.Configuration = await client.discovery(
  serverMy,
  clientId,
  clientSecret,
)

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST,GET,DELETE', 
    allowedHeaders: 'Content-Type,Authorization' 
};

app.use(cors(corsOptions));
app.use(express.json());

const userRepository = new UserRepository();
const authorsRepository = new AuthorsRepository();
const itemsRepository = new ItemsRepository();
const authRepository = new AuthRepository();


const userService =  new UserService(userRepository);
const authorsService =  new AuthorsService(authorsRepository);
const itemsService =  new ItemsService(itemsRepository);
const authService =  new AuthService(authRepository, userRepository, client, config);

const userController = new UserController(userService)
const authorsController = new AuthorsController(authorsService)
const itemsController = new ItemsController(itemsService)
const authController = new AuthController(authService)

const userRouter = createUsersRouter(userController)
const authorsRouter = createAuthorsRouter(authorsController)
const itemsRouter = createItemsRouter(itemsController)
const authRouter = createAuthRouter(authController)

app.use('/users', userRouter);
app.use('/authors', authorsRouter);
app.use('/items', itemsRouter);
app.use('/auth', authRouter);

app.use(errorHandler);

app.listen(process.env.PORT, (err) => {
  if (err && 'code' in err) {
        if (err.code === 'EADDRINUSE') {
            console.error(`Port ${process.env.PORT} is already in use.`);
        } else {
            console.error('Server error:', err);
        }
    } else {
        console.log(`Bookabase app listening on port ${process.env.PORT}`);
    }
});
