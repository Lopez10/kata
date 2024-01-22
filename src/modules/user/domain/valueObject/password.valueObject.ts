import { DomainPrimitive, ValueObject } from "../../../../common/domain/valueObject/valueObject.base";

export class Password extends ValueObject<string> {

    constructor(value: string) {
        super({value});  
        this.validate({value});
        this.props.value = value;
    }

    private validateHasOneNumber(props: DomainPrimitive<string>): void {
        const regex = /[0-9]/g;
        if (!regex.test(props.value)) {
            throw new Error("Password must have at least one number");
        }
    }

    private validateHasOneLetter(props: DomainPrimitive<string>): void {
        const regex = /[a-zA-Z]/g;
        if (!regex.test(props.value)) {
            throw new Error("Password must have at least one letter");
        }
    }

    private validateHasNumberCharacters(props: DomainPrimitive<string>, numberOfCharacters: number): void {
        if(props.value.length < numberOfCharacters) {
            throw new Error(`Password must have at least ${numberOfCharacters} characters`);
        }
    }
    

    protected validate(props: DomainPrimitive<string>): void {
        if (!props.value) {
            throw new Error("Password is required");
        }
        this.validateHasNumberCharacters(props, 8);
        this.validateHasOneLetter(props);
        this.validateHasOneNumber(props);
    }
}