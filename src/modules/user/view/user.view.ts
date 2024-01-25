import { UserViewPort } from "../presenter/user.view.port";
import { User } from '../domain/entity/user.entity';
import { Interface, createInterface } from "readline";

export class UserView implements UserViewPort {
    private rl: Interface;
    constructor() {
        this.rl = createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    
    printError(error: Error): void {
        console.log(error);
    }

    printUsers(users: User[]): void {
        users.forEach(user => {
            console.log(`Email: ${user.email.props.value}`);
        });
    }

    printWelcomeMessage(): void {
        console.log('Welcome to the user management system');
    }

    printUsersCount(usersCount: number): void {
        console.log(`There are ${usersCount} in the database`);
    }

    requestEmail(): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question('enter the email of the new user: ', (email: string) => {
                resolve(email);
            });
        });
    }

    requestPassword(): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question('enter the password of the new user: ', (password: string) => {
                resolve(password);
            });
        });
    }
}