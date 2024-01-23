import { User } from '../../domain/entity/user.entity';
import { UserRepositoryPort } from '../../domain/port/user.repository.port';
import { UseCase } from '../../../../common/application/useCase.base';

export class RetrieveUsers implements UseCase<void, User[]> {
    constructor(
        private readonly userRepository: UserRepositoryPort
    ) {}

    run(): Promise<User[]> {
        return this.userRepository.retrieveUsers();
    }
}