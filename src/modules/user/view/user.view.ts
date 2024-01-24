import { createInterface } from 'readline';
import { UserViewPort } from "../presenter/user.view.port";

export class UserView implements UserViewPort {
    constructor() {}
    
    printData(data: string): void {
        console.log(data);
    }

    getInput(prompt: string): Promise<string> {
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise(resolve => rl.question(prompt, answer => {
            rl.close();
            resolve(answer);
        }));
    }
}