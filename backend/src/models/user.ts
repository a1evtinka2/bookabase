export interface UserData {
    nickname: string,
    dateOfBirth: string,
}

export interface User extends UserData {
    id: string,
}