import { ValueObject } from "../../../../common/domain/valueObject/valueObject.base";
import { DomainEmail } from "./domainEmail.valueObject";

interface EmailProps {
    userEmail: string;
    domain: DomainEmail;
}

export class Email extends ValueObject<EmailProps> {

    constructor(value: EmailProps) {
        super(value);
        this.validate(value);
    }

    get email(): string {
        return this.props.userEmail+'@'+this.props.domain.props.value;
    }

    protected validate(props: EmailProps): void {
        if (!props.userEmail) {
            throw new Error("User email is required");
        }
        if (!props.domain) {
            throw new Error("Domain email is required");
        }
    }
}