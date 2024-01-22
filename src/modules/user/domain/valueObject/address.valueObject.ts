import { ValueObject } from "../../../../common/domain/valueObject/valueObject.base";
import { PostalCode } from "./postalCode.valueObject";

interface AddressProps {
    street: string;
    city: string;
    postalCode: PostalCode;
}

export class Address extends ValueObject<AddressProps> {
    constructor(props: AddressProps) {
        super(props);
        this.validate(props);
    }

    validate(props: AddressProps): void {
        if (!props.street) {
            throw new Error("Street is required");
        }
        if (!props.city) {
            throw new Error("City is required");
        }
        if (!props.postalCode) {
            throw new Error("Postal code is required");
        }
    }
}