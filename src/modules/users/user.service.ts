import jwt from "jsonwebtoken";
import { Service } from "typedi";
import bcrypt from "bcryptjs";
import { UserRepo } from "./user.repo";
import { HttpError } from "routing-controllers";

@Service()
export class UserService {
    constructor(private userRepo: UserRepo) {}

    public async signIn(body: { email: string; password: string }) {
        const user = await this.userRepo.getUser(body.email);
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret";
        if (!user) {
            return { status: 401, message: "User not found" };
        }
        const match = await bcrypt.compare(body.password, user.password);
        if (match) {
            const token = jwt.sign({ email: body.email }, JWT_SECRET_KEY);
            return { userID: user.userID, email: user.email, token };
        } else {
            return { message: "Incorrect credentials!!!" };
        }
    }

    public async signUp(body: {
        name: string;
        email: string;
        password: string;
    }) {
        const user = await this.userRepo.getUser(body.email);
        if (user) {
            return { status: 401, message: "User already exists." };
        }
        try {
            const hash = await bcrypt.hash(body.password, 10);
            await this.userRepo.createUser({
                name: body.name,
                email: body.email,
                password: hash,
            });
            return { message: "SignUp successfull" };
        } catch (error) {
            console.log(error);
        }
    }
}
