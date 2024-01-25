import { Password } from './../domain/valueObject/password.valueObject';
import { UserDto } from './../user.dto';
import { readFileSync, writeFileSync } from "fs";
import { User } from "../domain/entity/user.entity";
import { UserRepositoryPort } from "../domain/port/user.repository.port";
import { Email } from "../domain/valueObject/email.valueObject";

export class JsonUserRepository implements UserRepositoryPort {
    private filePath: string
    constructor(filePath: string){
        this.filePath = filePath
    }

    retrieveUsers(): User[] {
        const users = this.getUsers();

        return users.map((user: UserDto) => User.create({
            email: new Email(user.email),
            password: new Password(user.password)
        }));
    }

    addNewUser(user: User): void {
        const users = this.getUsers();

        users.push({
            email: user.email.props.value,
            password: user.password.props.value
        })
        writeFileSync(this.filePath, JSON.stringify(users))
    }
    retrieveUserByEmail(email: Email): User | null {
        const users = this.getUsers();

        const user = users.find((user: UserDto) => user.email === email.props.value)

        if(!user) return null

        return User.create({
            email: new Email(user.email),
            password: new Password(user.password)
        })
    }

    private getUsers() {
        const fileContent = readFileSync(this.filePath, 'utf-8');
        const users = JSON.parse(fileContent);
        return users;
    }
}