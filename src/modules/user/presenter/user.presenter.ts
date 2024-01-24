import { User } from '../domain/entity/user.entity';
import { Email } from '../domain/valueObject/email.valueObject';
import { Password } from '../domain/valueObject/password.valueObject';
import { AddNewUser } from '../application/useCase/addNewUser.useCase';
import { UserViewPort } from './user.view.port';
import { RetrieveUsers } from '../application/useCase/retrieveUsers.useCase';

const MENU_OPTIONS = {
    ADD_USER: '1',
    LIST_USERS: '2',
    EXIT: '3'
};

export class UserPresenter {
    constructor(
        private readonly addNewUserUseCase: AddNewUser,
        private readonly retrieveUsersUseCase: RetrieveUsers,
        private readonly userView: UserViewPort
    ){
        this.initialize()
    }

    async addNewUser({
        email,
        password
    }: {
        email: string,
        password: string
    }): Promise<void> {
        const emailVo = new Email(email)
        const passwordVo = new Password(password)

        const user = User.create({
            email: emailVo, 
            password: passwordVo
        })

        await this.addNewUserUseCase.run(user)
        this.showMenu()
    }

    async getCountUsers(): Promise<number> {
        const users = await this.retrieveUsersUseCase.run()
        return users.length
    }

    async retrieveUsers(): Promise<void> {
        const users = await this.retrieveUsersUseCase.run()
        users.forEach(user => {
            this.userView.printData(user.propsCopy.email.props.value)
        })
        this.showMenu()
    }

    initialize(): void {
        this.userView.printData('Welcome to user management')
        this.showMenu();
    }

    async showMenu(): Promise<void> {
        this.printMenuMessages();

        const choice = await this.userView.getInput('Enter your choice: ')

        switch (choice) {
            case MENU_OPTIONS.ADD_USER:
                this.addNewUser({
                    email: await this.userView.getInput('Enter the email: '),
                    password: await this.userView.getInput('Enter the password: ')
                });
                break;
            case MENU_OPTIONS.LIST_USERS:
                this.retrieveUsers();
                break;
            case MENU_OPTIONS.EXIT:
                break;
            default:
                this.userView.printData('Invalid choice');
        }
    }

    private async printMenuMessages() {
        this.userView.printData(`There are ${await this.getCountUsers()} in the database`);
        this.userView.printData('===============================');
        this.userView.printData('Choose one option: ');
        this.userView.printData(`Press ${MENU_OPTIONS.ADD_USER} to create a new user`);
        this.userView.printData(`Press ${MENU_OPTIONS.LIST_USERS} to list the users`);
        this.userView.printData(`Press ${MENU_OPTIONS.EXIT} to exit`);
    }
}