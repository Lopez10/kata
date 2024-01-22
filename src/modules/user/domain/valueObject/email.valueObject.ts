import { DomainPrimitive, ValueObject } from "../../../../common/domain/valueObject/valueObject.base";

export class Email extends ValueObject<string> {

    constructor(value: string) {
        super({value});  
        this.validate({value});
        this.props.value = value;
    }

    private validateEmail(props: DomainPrimitive<string>): void {
        const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        if (!emailRegex.test(props.value)) {
            throw new Error("Email is invalid");
        }
    }

    protected validate(props: DomainPrimitive<string>): void {
        if (!props.value) {
            throw new Error("Email is required");
        }
        this.validateEmail(props)
    }
}