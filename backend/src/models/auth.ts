import type { Session, SessionData } from "express-session";
import type { UserData } from "./user.ts";

export interface AuthData {
    nickname: UserData['nickname'],
    password: string,
}

export interface RegistrationData extends AuthData {
    dateOfBirth: UserData['dateOfBirth'],
}

export interface OpenIdTokenData {
    issuer: string,
    subject: string,
}

export interface OpenIdData {
    code_verifier: string,
    code_challenge: string,
    state: string,
    nonce: string,
}

export interface OpenIdDataWithUrl {
    openIdData: OpenIdData,
    url: string,
}

export type SessionDataExt = Session & Partial<SessionData> & {
    userId: string
}


