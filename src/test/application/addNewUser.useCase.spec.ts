import { AddNewUser } from "../../modules/user/application/useCase/addNewUser.useCase";
import { User } from "../../modules/user/domain/entity/user.entity";
import { DomainEmail } from "../../modules/user/domain/valueObject/domainEmail.valueObject";
import { Email } from "../../modules/user/domain/valueObject/email.valueObject";
import { Password } from "../../modules/user/domain/valueObject/password.valueObject";
import { MockUserRepository } from "../domain/infrastructure/mock.user.repository";

describe('AddNewUser use case', () => {
    it(`
        GIVEN an user data
        WHEN the user does not exist
        THEN it should be added
    `, async () => {
        const mockUserRepository = new MockUserRepository();
        const addNewUserUseCase = new AddNewUser(mockUserRepository);
        // GIVEN
        const userData = {
            email: new Email({
                userEmail: 'john',
                domain: new DomainEmail('test.com')
            }),
            password: new Password('12345678Test')
        }

        // WHEN
        const user = User.create(userData);
        await addNewUserUseCase.run(user)

        // THEN
        const userFound = await mockUserRepository.retrieveUserByEmail(userData.email);
        expect(userFound).not.toBeNull();
        expect(userFound?.email).toBe(userData.email);
        expect(userFound?.password).toBe(userData.password);
    });

    it(`
        GIVEN an user data
        WHEN the user with the same email already exists
        THEN it should throw an error
    `, async () => {
        const mockUserRepository = new MockUserRepository();
        const addNewUserUseCase = new AddNewUser(mockUserRepository);

        mockUserRepository.addNewUser(
            User.create({
                email: new Email({
                    userEmail: 'john',
                    domain: new DomainEmail('test.com')
                }),
                password: new Password('123451111Test')
            })
        );

        // GIVEN
        const userData = {
            email: new Email({
                userEmail: 'john',
                domain: new DomainEmail('test.com')
            }),
            password: new Password('12345678Test')
        }

        // WHEN
        const user = User.create(userData);
        const addNewUser = async () => addNewUserUseCase.run(user);

        // THEN
        expect(addNewUser).rejects.toThrow('User already exists')
    });
});