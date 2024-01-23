import { User } from "../../../modules/user/domain/entity/user.entity";
import { UserRepositoryPort } from "../../../modules/user/domain/port/user.repository.port";
import { Email } from "../../../modules/user/domain/valueObject/email.valueObject";

export class MockUserRepository implements UserRepositoryPort {
    private users: User[] = [];

    async retrieveUsers(): Promise<User[]> {
        return this.users;
    }
    
    async addNewUser(user: User): Promise<void> {
        this.users.push(user);
    }

    async retrieveUserByEmail(email: Email): Promise<User | null> {
        const user = this.users.find(user => user.email.matches(email)) || null;
        return user;
    }
}