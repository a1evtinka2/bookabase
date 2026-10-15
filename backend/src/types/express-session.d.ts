import type { OpenIdData, OpenIdTokenData } from "../models/auth.ts";

declare module "express-session" {
    export interface SessionData {
      userId?: string;
      oidcTransaction?: OpenIdData;
      pendingGoogleRegistration?: OpenIdTokenData;
  }
}