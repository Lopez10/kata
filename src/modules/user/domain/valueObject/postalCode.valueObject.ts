import { DomainPrimitive, ValueObject } from "../../../../common/domain/valueObject/valueObject.base";

export class PostalCode extends ValueObject<number> {
    
    constructor(value: number) {
        super({value});  
        this.validate({value});
        this.props.value = value;
    }

    validatePostalCode(props: DomainPrimitive<number>): void {
        if (props.value < 1000 || props.value > 9999) {
            throw new Error("Postal code is invalid");
        }
    }

    protected validate(props: DomainPrimitive<number>): void {
        if (!props.value) {
            throw new Error("Postal code is required");
        }
        this.validatePostalCode(props)
    }
}