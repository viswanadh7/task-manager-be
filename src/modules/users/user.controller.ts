import { Body, JsonController, Post } from "routing-controllers";
import { UserService } from "./user.service";
import { Service } from "typedi";

@Service()
@JsonController("/users")
export class UserController {
    constructor(private userService: UserService) {}

    @Post("/signin")
    async signIn(@Body() body: { email: string; password: string }) {
        return await this.userService.signIn(body);
    }

    @Post("/signup")
    signUp(@Body() body: { name: string; email: string; password: string }) {
        return this.userService.signUp(body);
    }
}
