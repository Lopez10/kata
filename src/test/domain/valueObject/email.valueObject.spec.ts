import { Email } from "../../../modules/user/domain/valueObject/email.valueObject";

describe('Email value object', () => {
    it(`
        GIVEN a valid email
        WHEN email is being created
        THEN it should be created with correct value
    `, () => {
        //GIVEN
        const email = 'prueba@test.com';
        //WHEN
        const emailVo = new Email(email);
        //THEN
        expect(emailVo).toBeDefined();
        expect(emailVo.props.value).toBe(email);
    });

    it(`
        GIVEN an empty email
        WHEN email is being created
        THEN it should throw an empty error
    `, () => {
        // GIVEN
        const email = ''
        // WHEN
        const emailVo = () => new Email(email);
        // THEN
        expect(emailVo).toThrow('Email is required')
    });

    it(`
        GIVEN an invalid email
        WHEN email is being created
        THEN it should throw an invalid email error
    `, () => {
        // GIVEN
        const email = 'prueba.com'
        // WHEN
        const emailVo = () => new Email(email);
        // THEN
        expect(emailVo).toThrow('Email is invalid')
    });
});