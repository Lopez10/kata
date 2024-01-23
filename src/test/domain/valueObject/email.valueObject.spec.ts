import { DomainEmail } from "../../../modules/user/domain/valueObject/domainEmail.valueObject";
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
        const emailVo = new Email({
            userEmail: 'prueba',
            domain: new DomainEmail('test.com')
        });

        //THEN
        expect(emailVo).toBeDefined();
        expect(emailVo.email).toBe(email);
    });

    it(`
        GIVEN an empty email
        WHEN email is being created
        THEN it should throw an empty error
    `, () => {
        // GIVEN
        // WHEN
        const emailVo = () => new Email({
            userEmail: '',
            domain: new DomainEmail('test.com')
        });

        // THEN
        expect(emailVo).toThrow('User email is required')
    });

    // it(`
    //     GIVEN an invalid email
    //     WHEN email is being created
    //     THEN it should throw an invalid email error
    // `, () => {
    //     // GIVEN
    //     // WHEN
    //     const emailVo = () => new Email({
    //         userEmail: '',
    //         domain: new DomainEmail('test.com')
    //     });

    //     // THEN
    //     expect(emailVo).toThrow('User email is required')
    // });

    it(`
        GIVEN two emails with same value
        WHEN emails are being compared
        THEN it should return true
    `, () => {
        // GIVEN
        const emailVo = new Email({
            userEmail: 'test',
            domain: new DomainEmail('test.com')
        });
        const emailVo2 = new Email({
            userEmail: 'test',
            domain: new DomainEmail('test.com')
        });

        // WHEN
        const compareEmails = emailVo.matches(emailVo2)

        // THEN
        expect(compareEmails).toBe(true)
    });

    it(`
        GIVEN two emails with different value
        WHEN emails are being compared
        THEN it should return false
    `, () => {
        // GIVEN
        const emailVo = new Email({
            userEmail: 'test',
            domain: new DomainEmail('test.com')
        });
        const emailVo2 = new Email({
            userEmail: 'test',
            domain: new DomainEmail('fake.com')
        });

        // WHEN
        const compareEmails = emailVo.matches(emailVo2);
        
        // THEN
        expect(compareEmails).toBe(false)
    });
});