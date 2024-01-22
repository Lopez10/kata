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

    it(`
        GIVEN two emails with same value
        WHEN emails are being compared
        THEN it should return true
    `, () => {
        // GIVEN
        const email = 'test@test.com'
        const email2 = 'test@test.com'
        // WHEN
        const emailVo = new Email(email);
        const emailVo2 = new Email(email2);
        // THEN
        expect(emailVo.matches(emailVo2)).toBe(true)
    });

    it(`
        GIVEN two emails with different value
        WHEN emails are being compared
        THEN it should return false
    `, () => {
        // GIVEN
        const email = 'test@test.com'
        const email2 = 'test@fake.com'
        // WHEN
        const emailVo = new Email(email);
        const emailVo2 = new Email(email2);
        // THEN
        expect(emailVo.matches(emailVo2)).toBe(false)
    });
});