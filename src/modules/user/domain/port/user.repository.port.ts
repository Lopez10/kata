import { User } from "../entity/user.entity";
import { Email } from "../valueObject/email.valueObject";

export interface UserRepositoryPort {
    retrieveUsers(): User[];
    addNewUser(user: User): void;
    retrieveUserByEmail(email: Email): User | null;
}