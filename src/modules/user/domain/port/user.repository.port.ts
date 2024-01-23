import { User } from "../entity/user.entity";
import { Email } from "../valueObject/email.valueObject";

export interface UserRepositoryPort {
    retrieveUsers(): Promise<User[]>;
    addNewUser(user: User): Promise<void>;
    retrieveUserByEmail(email: Email): Promise<User | null>;
}