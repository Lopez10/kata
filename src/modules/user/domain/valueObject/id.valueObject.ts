import { v4 } from "uuid";
import { ValueObject } from "../../../../common/domain/valueObject/valueObject.base";

export class Id extends ValueObject<string> {
    constructor(value?: string) {
        super(value ? {value} : {value: v4()});
        this.validate({value: this.props.value});
    }

    protected validate(props: { value: string }): void {
        if (!props.value) {
            throw new Error("Id is required");
        }
    }
}