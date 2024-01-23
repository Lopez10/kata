import { User } from "../../../modules/user/domain/entity/user.entity";
import { UserRepositoryPort } from "../../../modules/user/domain/port/user.repository.port";

export class MockUserRepository implements UserRepositoryPort {
    // Todo: Modify to Dto
    private users: User[] = [];

    async getUsers(): Promise<User[]> {
        return this.users;
    }
    
    async addNewUser(user: User): Promise<void> {
        this.users.push(user);
    }
}