import { Password } from "../../../modules/user/domain/valueObject/password.valueObject";

describe('Password value object', () => {
    it(`
        GIVEN a valid password
        WHEN password is being created
        THEN it should be created with correct value
    `, () => {
        // GIVEN
        const password = 'password1'
        // WHEN
        const passwordVo = new Password(password);
        // THEN
        expect(passwordVo).toBeDefined();
        expect(passwordVo.props.value).toBe(password);
    });

    it(`
        GIVEN an empty password
        WHEN password is being created
        THEN it should throw an empty error
    `, () => {
        // GIVEN
        const password = ''
        // WHEN
        const passwordVo = () => new Password(password);
        // THEN
        expect(passwordVo).toThrow('Password is required')
    });

    it(`
        GIVEN an invalid password without number
        WHEN password is being created
        THEN it should throw an invalid password error
    `, () => {
        // GIVEN
        const password = 'password'
        // WHEN
        const passwordVo = () => new Password(password);
        // THEN
        expect(passwordVo).toThrow('Password must have at least one number')
    });

    it(`
        GIVEN an invalid password without letter
        WHEN password is being created
        THEN it should throw an invalid password error
    `, () => {
        // GIVEN
        const password = '12345678'
        // WHEN
        const passwordVo = () => new Password(password);
        // THEN
        expect(passwordVo).toThrow('Password must have at least one letter')
    });

    it(`
        GIVEN an invalid password without 8 characters
        WHEN password is being created
        THEN it should throw an invalid password error
    `, () => {
        // GIVEN
        const password = '12ho'
        // WHEN
        const passwordVo = () => new Password(password);
        // THEN
        expect(passwordVo).toThrow('Password must have at least 8 characters')
    });
});