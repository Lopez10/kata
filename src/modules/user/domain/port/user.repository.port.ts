import { User } from "../entity/user.entity";

export interface UserRepositoryPort {
    getUsers(): Promise<User[]>;
    addNewUser(user: User): Promise<void>;
}