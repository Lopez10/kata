import { User } from "../../domain/entity/user.entity";
import { UserRepositoryPort } from "../../domain/port/user.repository.port";

export class AddNewUser {
    constructor(
        private readonly userRepository: UserRepositoryPort
    ) {}

    async run(user: User): Promise<void> {
        const userFound = await this.userRepository.retrieveUserByEmail(user.email);

        if (userFound) {
            throw new Error('User already exists');
        }
        
        await this.userRepository.addNewUser(user);
    }
}