import { AddNewUser } from "./application/useCase/addNewUser.useCase";
import { RetrieveUsers } from "./application/useCase/retrieveUsers.useCase";
import { JsonUserRepository } from "./infrastructure/json.user.repository";
import { UserPresenter } from "./presenter/user.presenter";
import { UserView } from "./view/user.view";


const REPOSITORY_PATH = '/home/jlopezberges/Documentos/kata/users.json';

export function getUsersPresenter(userView: UserView) {
    const userRepository = new JsonUserRepository(REPOSITORY_PATH)
    const retrieveUsers = new RetrieveUsers(userRepository)
    const addNewUser = new AddNewUser(userRepository)

    return new UserPresenter(addNewUser, retrieveUsers, userView)
}