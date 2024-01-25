import { User } from "../domain/entity/user.entity";
import { UserRepositoryPort } from "../domain/port/user.repository.port";
import { Email } from "../domain/valueObject/email.valueObject";

export class InMemoryUserRepository implements UserRepositoryPort {
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