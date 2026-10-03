import { randomUUID } from "node:crypto";
import type { User, UserData } from "../models/user.ts";
import { UserRepository } from "../repositories/userRepository/index.ts";
import { dateIsFormatted, dateIsNotInFuture } from "../validators/dataValidators.ts";
import { AppError } from "../models/error.ts";

export class UserService {
  private users: User[] = [];
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  fetchUsers = async () => {
    const allUsers = await this.userRepository.getAllUsers();
    return allUsers;
}

  createUser = async (userData: UserData) => {
    const date = userData.dateOfBirth;
    
    const validDate = dateIsFormatted(date) && dateIsNotInFuture(date);

    if (!validDate) {
      throw new AppError(400, 'invalid date of birth')
    }

    const id = randomUUID()
    
    const userToCreate = {
      ...userData,
      id,
    };
    const newUser = await this.userRepository.create(userToCreate);
    return newUser;
}
}
