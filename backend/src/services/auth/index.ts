import { randomUUID } from "node:crypto";
import type { AuthData, OpenIdData, OpenIdDataWithUrl, OpenIdTokenData, RegistrationData } from "../../models/auth.ts";
import type { AuthRepository } from "../../repositories/authRepository/index.ts";
import type { UserRepository } from "../../repositories/userRepository/index.ts";
import type { User } from "../../models/user.ts";
import * as openIdclient from 'openid-client';
import getRequiredEnv from "../../helpers/getRequiredEnv.ts";


export class AuthService {
  private authRepository: AuthRepository;
  private userRepository: UserRepository;
  private client: typeof openIdclient;
  private config: openIdclient.Configuration;

  constructor(
    authRepository: AuthRepository, 
    userRepository: UserRepository,
    client: typeof openIdclient,
    config: openIdclient.Configuration,
  ) {
    this.authRepository = authRepository;
    this.userRepository = userRepository;
    this.client = client;
    this.config = config;
  }

  login = async (loginData: AuthData) => {
    const author = await this.authRepository.login(loginData);
    return author;
  }

  authWithGoogle = async (openIdDataWithUrl: OpenIdDataWithUrl): Promise<User | undefined> => {
    const { openIdData, url } =  openIdDataWithUrl;
    
    //TODO
    const currentUrl = new URL(
      `http://localhost:3000/auth${url}`,
    );
    
    const config = this.config;
     let tokens = await this.client.authorizationCodeGrant(
          config,
          currentUrl,
          {
            pkceCodeVerifier: openIdData.code_verifier,
            expectedState: openIdData.state,   
            expectedNonce: openIdData.nonce,      
          },
     )

    if(tokens) {
      const tokenData = tokens.claims();
      if (tokenData) {
        const { iss, sub } = tokenData;
        const userId = await this.authRepository.findUserInAuthIdentities({ issuer: iss, subject: sub});
        if (userId) {
          return this.userRepository.getUser(userId)
        } 
      }
  
    }

      return undefined;
  }


  createGoogleAuthorizationRequest = async (): Promise<OpenIdDataWithUrl> => {
      let code_verifier: string = this.client.randomPKCECodeVerifier()
      let code_challenge: string = await this.client.calculatePKCECodeChallenge(code_verifier)

      let parameters: Record<string, string> = {
        redirect_uri: getRequiredEnv('GOOGLE_CALLBACK_URL'),
        scope: 'openid profile email',
        code_challenge,
        code_challenge_method: 'S256',
      }
       
      let nonce: string = this.client.randomNonce()
      parameters.nonce = nonce;

      let state: string = this.client.randomState()
      parameters.state = state
        
      const openIdData: OpenIdData = {
        code_verifier,
        code_challenge,
        state,
        nonce,
      }

      const redirectionLink: string = String(this.client.buildAuthorizationUrl(this.config, parameters))
     

      return { openIdData, url: redirectionLink };
  }

  //  createSession = async (userId: string) => {
  //   // const author = await this.authRepository.get();
  //   // return author;
  // }



  register = async (regData: RegistrationData) => {
    const { nickname, password, dateOfBirth } = regData;

    const normalizedName = nickname?.split(' ').filter((s) => s !== '').join(' ').toLowerCase(); 

    const id = randomUUID();
    
    const userToRegister = {
      ...regData,
      nickname: normalizedName,
    };
    const newAuthor = await this.authRepository.register(userToRegister);
    return newAuthor;
  }
}
