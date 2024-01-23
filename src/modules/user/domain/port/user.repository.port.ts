import { User } from "../entity/user.entity";
import { Email } from "../valueObject/email.valueObject";

export interface UserRepositoryPort {
    getUsers(): Promise<User[]>;
    addNewUser(user: User): Promise<void>;
    getUserByEmail(email: Email): Promise<User | null>;
}