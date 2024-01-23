import { DomainPrimitive, ValueObject } from "../../../../common/domain/valueObject/valueObject.base";

export class DomainEmail extends ValueObject<string> {
    constructor(value: string) {
        super({value});
        this.validate({value});
        this.props.value = value;
    }

    protected validate(props: DomainPrimitive<string>): void {
        if (!props.value) {
            throw new Error("Domain email is required");
        }
    }
}