import { User } from "../../../modules/user/domain/entity/user.entity";
import { UserRepositoryPort } from "../../../modules/user/domain/port/user.repository.port";
import { Email } from "../../../modules/user/domain/valueObject/email.valueObject";

export class MockUserRepository implements UserRepositoryPort {
    private users: User[] = [];

    retrieveUsers(): User[] {
        return this.users;
    }
    
    addNewUser(user: User): void {
        this.users.push(user);
    }

    retrieveUserByEmail(email: Email): User | null {
        const user = this.users.find(user => user.email.matches(email)) || null;
        return user;
    }
}