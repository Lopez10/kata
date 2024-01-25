import { User } from "../domain/entity/user.entity"

export interface UserViewPort {
    printWelcomeMessage(): void
    requestEmail(): Promise<string>
    requestPassword(): Promise<string>
    printUsers(users: User[]): void
    printUsersCount(usersCount: number): void
    printError(error: unknown): void
}