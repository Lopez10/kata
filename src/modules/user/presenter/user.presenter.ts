import { User } from '../domain/entity/user.entity';
import { Email } from '../domain/valueObject/email.valueObject';
import { Password } from '../domain/valueObject/password.valueObject';
import { AddNewUser } from '../application/useCase/addNewUser.useCase';
import { UserViewPort } from './user.view.port';
import { RetrieveUsers } from '../application/useCase/retrieveUsers.useCase';


export class UserPresenter {
    constructor(
        private readonly addNewUserUseCase: AddNewUser,
        private readonly retrieveUsersUseCase: RetrieveUsers,
        private readonly userView: UserViewPort
    ){
        this.initialize()
    }

    private async initialize(): Promise<void> {
        this.userView.printWelcomeMessage();
        await this.getUsersCount();
        await this.requestNewUser();
        await this.listUsers();
    }

    private async getUsersCount(): Promise<void> {
        const usersCount = await this.getUsersNumber();
        this.userView.printUsersCount(usersCount);
    }

    private async requestNewUser(): Promise<void> {
        const email = await this.userView.requestEmail();
        const password = await this.userView.requestPassword();

        await this.addNewUser({
            email: email,
            password: password
        })
    }

    private async addNewUser({
        email,
        password
    }: {
        email: string,
        password: string
    }): Promise<void> {
        try{
            const emailVo = new Email(email)
            const passwordVo = new Password(password)

            const user = User.create({
                email: emailVo, 
                password: passwordVo
            })

            await this.addNewUserUseCase.run(user)
        } catch (error) {
            this.userView.printError(error)
        }
    }

    private async getUsersNumber(): Promise<number> {
        const users = await this.retrieveUsersUseCase.run()
        return users.length
    }

    private async listUsers(): Promise<void> {
        const users = await this.retrieveUsersUseCase.run()
        this.userView.printUsers(users)
    }
}