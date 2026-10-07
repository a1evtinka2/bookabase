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
import { JwksClient } from 'jwks-rsa';
import { type Response, type Request, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRepository } from './repositories/authRepository/index.ts';
import { AuthService } from './services/auth/index.ts';
import { AuthController } from './controllers/auth/index.ts';
import createAuthRouter from './routes/auth/index.ts';
import * as client from 'openid-client'


const app: Express = express();

const userRepository = new UserRepository();
const authorsRepository = new AuthorsRepository();
const itemsRepository = new ItemsRepository();
const authRepository = new AuthRepository();


const userService =  new UserService(userRepository);
const authorsService =  new AuthorsService(authorsRepository);
const itemsService =  new ItemsService(itemsRepository);
const authService =  new AuthService(authRepository);

const userController = new UserController(userService)
const authorsController = new AuthorsController(authorsService)
const itemsController = new ItemsController(itemsService)
const authController = new AuthController(authService)

const userRouter = createUsersRouter(userController)
const authorsRouter = createAuthorsRouter(authorsController)
const itemsRouter = createItemsRouter(itemsController)
const authRouter = createAuthRouter(authController)

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST,GET,DELETE', 
    allowedHeaders: 'Content-Type,Authorization' 
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/users', userRouter);
app.use('/authors', authorsRouter);
app.use('/items', itemsRouter);
app.use('/auth', authRouter);


app.use(errorHandler);

const google = new URL( 'https://accounts.google.com' );
let server: URL = google;
let clientId: string = process.env.GOOGLE_CLIENT_ID || '';
let clientSecret: string = process.env.GOOGLE_CLIENT_SECRET || '';

let config: client.Configuration = await client.discovery(
  server,
  clientId,
  clientSecret,
)

let code_verifier: string = client.randomPKCECodeVerifier()
let code_challenge: string = await client.calculatePKCECodeChallenge(code_verifier)
 
// Parameters for the authorization URL
let parameters: Record<string, string> = {
  redirect_uri: 'https://localhost:3000',
  scope: 'openid profile email api:read',
  code_challenge,
  code_challenge_method: 'S256',
}
 
/**
 * Backward compatibility: Use 'state' if the server doesn't support PKCE.
 * openid-client provides a helper to check this in metadata.
 */
let state: string | undefined
if (!config.serverMetadata().supportsPKCE()) {
  state = client.randomState()
  parameters.state = state
}
 
let redirectTo: URL = client.buildAuthorizationUrl(config, parameters)
// Redirect the user to redirectTo.href

let currentUrl: URL = new URL(window.location.href)
 
let tokens: client.TokenEndpointResponse = await client.authorizationCodeGrant(
  config,
  currentUrl,
  {
    pkceCodeVerifier: code_verifier, // Recovered from session
    expectedState: state,           // Recovered from session if used
  },
)

if (tokens.id_token) {
  // const claims = tokens?.claims?.()
  console.log('User Subject ID:', tokens?.claims)
}
 
// Accessing a protected API
// let response = await client.fetchProtectedResource(
//   config,
//   tokens.access_token,
//   new URL('https://api.example.com/data'),
//   'GET'
// )


process.on('exit', (code) => {
  console.log('NODE EXITING, CODE:', code);
});

app.listen(process.env.PORT, () => {
  console.log(`Bookabase app listening on port ${process.env.PORT}`);
});