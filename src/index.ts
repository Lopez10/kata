import { getUsersPresenter } from "./modules/user/serviceLocator";
import { UserView } from "./modules/user/view/user.view";

function main(){
    const usersView = new UserView()
    getUsersPresenter(usersView)   
}

main()