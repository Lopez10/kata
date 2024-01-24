export interface UserViewPort {
    printData(data: string): void
    getInput(prompt: string): Promise<string>
}