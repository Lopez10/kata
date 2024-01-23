import { RetrieveUsers } from "../../modules/user/application/useCase/retrieveUsers.useCase";
import { User } from "../../modules/user/domain/entity/user.entity";
import { Email } from "../../modules/user/domain/valueObject/email.valueObject";
import { Password } from "../../modules/user/domain/valueObject/password.valueObject";
import { MockUserRepository } from "../domain/infrastructure/mock.user.repository";

describe('RetrieveUsers use case', () => {
    it(`
        GIVEN there are two users 
        WHEN I retrieve all users
        THEN I should retrieve two users
    `, async() => {
        const mockUserRepository = new MockUserRepository();
        const retrieveUsersUseCase = new RetrieveUsers(mockUserRepository);

        // GIVEN
        const userData = {
            email: new Email('user1@test.com'),
            password: new Password('12345678Test')
        }
        const userData2 = {
            email: new Email('user2@test.com'),
            password: new Password('12345678Test')
        }

        const user = User.create(userData);
        const user2 = User.create(userData2);

        mockUserRepository.addNewUser(user);
        mockUserRepository.addNewUser(user2);

        // WHEN
        const users = await retrieveUsersUseCase.run();

        // THEN
        expect(users).toHaveLength(2);
        expect(users[0].email).toBe(userData.email);
        expect(users[0].password).toBe(userData.password);
        expect(users[1].email).toBe(userData2.email);
        expect(users[1].password).toBe(userData2.password);
    });

    it(`
        GIVEN there are no users 
        WHEN I retrieve all users
        THEN I should retrieve an empty array
    `, async() => {
        const mockUserRepository = new MockUserRepository();
        const retrieveUsersUseCase = new RetrieveUsers(mockUserRepository);

        // WHEN
        const users = await retrieveUsersUseCase.run();

        // THEN
        expect(users).toHaveLength(0);
    });
});