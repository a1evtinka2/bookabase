type User = {
  id: string,
  nickname: string,
  dateOfBirth: number,
}

const mockUsers: User[] = [
    {  id: '123',
       nickname: 'nat',
       dateOfBirth: 4,
    },
    {  id: '124',
       nickname: 'mal',
       dateOfBirth: 5,
    }
]

export class UserService {
  private users: User[] = [];

  fetchUsers = async () => {
    this.users = mockUsers;
    return this.users;
}
}
