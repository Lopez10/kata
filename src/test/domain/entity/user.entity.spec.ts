import { User } from "../../../modules/user/domain/entity/user.entity";
import { DomainEmail } from "../../../modules/user/domain/valueObject/domainEmail.valueObject";
import { Email } from "../../../modules/user/domain/valueObject/email.valueObject";
import { Id } from "../../../modules/user/domain/valueObject/id.valueObject";
import { Password } from "../../../modules/user/domain/valueObject/password.valueObject";

describe('User entity', () => {
    it(`
        GIVEN a valid user
        WHEN the user is created
        THEN it should be created without errors
    `, () => {
        // GIVEN 
        const userData = {
            id: new Id(),
            email: new Email({
                userEmail: 'valid-email',
                domain: new DomainEmail('valid-domain.com')
            }),
            password: new Password('valid-password1')
        };
        
        // WHEN
        const user = User.create(userData);

        // THEN
        expect(user).toBeDefined();
        expect(user.props).toEqual({
            id: userData.id,
            email: userData.email,
            password: userData.password,
        });
    });

    it(`
        GIVEN one valid user created
        WHEN the user is compared to the same user
        THEN it should be true
    `, () => {
        // GIVEN 
        const userData = {
            email: new Email({
                userEmail: 'valid-email',
                domain: new DomainEmail('valid-domain.com')
            }),
            password: new Password('valid-password1')
        };
        const user = User.create(userData);

        // WHEN
        const result = user.equals(user);

        // THEN
        expect(result).toBeTruthy();
    });

    it(`
        GIVEN two valid users created
        WHEN the users are compared
        THEN it should be false
    `, () => {
        // GIVEN 
        const userData = {
            email: new Email({
                userEmail: 'valid-email',
                domain: new DomainEmail('valid-domain.com')
            }),
            password: new Password('valid-password1')
        };

        const userDataCopy = {
            email: new Email({
                userEmail: 'valid-email',
                domain: new DomainEmail('valid-domain.com')
            }),
            password: new Password('valid-password1')
        };

        const user = User.create(userData);
        const userCopy = User.create(userDataCopy);

        // WHEN
        const result = user.equals(userCopy);

        // THEN
        expect(result).toBeFalsy();
    });
});