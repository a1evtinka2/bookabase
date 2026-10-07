import { randomUUID } from "node:crypto";
import type { AuthData, RegistrationData } from "../../models/auth.ts";
import type { AuthRepository } from "../../repositories/authRepository/index.ts";

export class AuthService {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  login = async (loginData: AuthData) => {
    const author = await this.authRepository.login(loginData);
    return author;
  }



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
