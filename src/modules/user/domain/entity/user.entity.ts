import { Email } from "../valueObject/email.valueObject";
import { Id } from "../valueObject/id.valueObject";
import { Password } from "../valueObject/password.valueObject";

export interface UserProps {
    email: Email;
    password: Password;
}

export class User {
    public readonly props: UserProps;
    private readonly id: Id;

    private constructor(props: UserProps, id?: Id) {
        this.props = props;
        this.id = id ? id : new Id()
    }

    get email(): Email {
        return this.props.email;
    }

    get password(): Password {
        return this.props.password;
    }

    get propsCopy(): Readonly<{ id: Id } & UserProps> {
        const propsCopy = {
            id: this.id,
            ...this.props,
          };
          return Object.freeze(propsCopy);
      
    }

    public static create(props: UserProps, id?: Id): User {
        try {
            const user = new User(props, id);
            return user;
        } catch (error) {
            throw new Error('User creation failed')
        }
        
    }

    public equals(user: User): boolean {
        return this.id.matches(user.id);
    }
}