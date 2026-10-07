import type { UserData } from "./user.ts";

export interface AuthData {
    nickname: UserData['nickname'],
    password: string,
}

export interface RegistrationData extends AuthData {
    dateOfBirth: UserData['dateOfBirth'],
}