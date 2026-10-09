import type { OpenIdData } from "../models/auth.ts";

declare module "express-session" {
    export interface SessionData {
      userId?: string;
      oidcTransaction?: OpenIdData;
    }
}