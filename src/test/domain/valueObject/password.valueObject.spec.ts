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

    it(`
        GIVEN two passwords with same value
        WHEN passwords are being compared
        THEN it should return true
    `, () => {
        // GIVEN
        const password = 'password1'
        const password2 = 'password1'

        // WHEN
        const passwordVo = new Password(password);
        const passwordVo2 = new Password(password2);

        // THEN
        expect(passwordVo.matches(passwordVo2)).toBe(true)
    });

    it(`
        GIVEN two passwords with different value
        WHEN passwords are being compared
        THEN it should return false
    `, () => {
        // GIVEN
        const password = 'password1'
        const password2 = 'password2'

        // WHEN
        const passwordVo = new Password(password);
        const passwordVo2 = new Password(password2);
        
        // THEN
        expect(passwordVo.matches(passwordVo2)).toBe(false)
    });
});