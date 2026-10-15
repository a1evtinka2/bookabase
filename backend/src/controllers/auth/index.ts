import type { AuthData, OpenIdTokenData, RegistrationData, SessionDataExt } from '../../models/auth.ts';
import type { AuthService } from '../../services/auth/index.ts';
import { type Response, type Request, type NextFunction } from 'express';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }


  public async login(
        req: Request, 
        res: Response, 
        next: NextFunction) {
    try {
        const authData: AuthData = req.body;

        const deleted = await this.authService.login(authData);
        res.status(200).json(deleted);
    } catch (error) {
        next(error);
    }
  }

  public async initAuthWithGoogle(
        req: Request, 
        res: Response, 
        next: NextFunction) {
    try {
     const { openIdData, url } = await this.authService.createGoogleAuthorizationRequest()

      req.session.oidcTransaction = openIdData;
        
      res.status(303).redirect(url);
    } catch (error) {
        next(error);
    }
  }


  public async authWithGoogle(
        req: Request, 
        res: Response, 
        next: NextFunction) {
    try {
        const openIdData = req.session.oidcTransaction;
        const url = req.url;        
        
        if (!url || !openIdData) {
          res.status(303).json('Failed to authenticate with Google');
          return;
        };

        const existingUser = await this.authService.authWithGoogle({ openIdData, url });

        console.log(existingUser, 'existingUser');
        if (existingUser && 'id' in existingUser) {
            req.session.userId = existingUser.id
            // req.session.currentUrl = url
            await req.session.save();
            return res.redirect('http://localhost:5173');

        } else if (existingUser) {
          const pendingGoogleRegistration: OpenIdTokenData = {
            issuer: existingUser.issuer,
            subject: existingUser.subject
          }
          req.session.pendingGoogleRegistration = pendingGoogleRegistration;
          await req.session.save();
          console.log('Google callback:', {
  sessionID: req.sessionID,
  pending: req.session.pendingGoogleRegistration,
});
          res.redirect('http://localhost:5173/register');
        }
    } catch (error) {
        next(error);
    }
  }

  public async logout(
        req: Request, 
        res: Response, 
        next: NextFunction) {
    try {     
      req.session.destroy(() => {
        res.redirect('/')
      });
    } catch (error) {
        next(error);
    }
  }


  public async register(
    req: Request, 
    res: Response, 
    next: NextFunction) {
    try {
      // console.log(req, 'reeeeq');
      console.log('Registration request:', {
  sessionID: req.sessionID,
  pending: req.session.pendingGoogleRegistration,
});
      
          const pendingGoogleRegistration = req.session.pendingGoogleRegistration;
        console.log(pendingGoogleRegistration, 'openIdData');
        
        if (!pendingGoogleRegistration) {
          res.status(303).json('Failed to authenticate with Google');
          return;
        };

        // const existingUser = await this.authService.authWithGoogle({ openIdData, url });

        const authData: RegistrationData = req.body;

        const newAuthor = await this.authService.register(authData, pendingGoogleRegistration);
        // res.redirect('http://localhost:5173');
        res.status(201).json('Logged In')

    } catch (error) {
        next(error);
    }
  }
}


