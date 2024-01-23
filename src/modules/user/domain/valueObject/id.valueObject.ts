import { ValueObject } from "../../../../common/domain/valueObject/valueObject.base";

export class Id extends ValueObject<string> {
    constructor({
        value,
        idGenerator = Id.generateRandom
    }:{
        value?: string, 
        idGenerator?: () => string 
    } = {}) {
        const idValue = value ? value : idGenerator();
        super({value: idValue});
        this.validate({value: this.props.value});
    }

    static generateRandom(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    protected validate(props: { value: string }): void {
        if (!props.value) {
            throw new Error("Id is required");
        }
    }
}