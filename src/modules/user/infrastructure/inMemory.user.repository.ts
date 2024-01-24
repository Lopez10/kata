import { User } from "../domain/entity/user.entity";
import { UserRepositoryPort } from "../domain/port/user.repository.port";
import { Email } from "../domain/valueObject/email.valueObject";

export class InMemoryUserRepository implements UserRepositoryPort {
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