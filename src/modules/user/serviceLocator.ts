import { AddNewUser } from "./application/useCase/addNewUser.useCase";
import { RetrieveUsers } from "./application/useCase/retrieveUsers.useCase";
import { InMemoryUserRepository } from "./infrastructure/inMemory.user.repository";
import { UserPresenter } from "./presenter/user.presenter";
import { UserView } from "./view/user.view";

export function getUsersPresenter(userView: UserView) {
    const userRepository = new InMemoryUserRepository()
    const retrieveUsers = new RetrieveUsers(userRepository)
    const addNewUser = new AddNewUser(userRepository)

    return new UserPresenter(addNewUser, retrieveUsers, userView)
}