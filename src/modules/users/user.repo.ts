import { Service } from "typedi";
import { UserModel } from "./user.model";
import { UniqueConstraintError } from "sequelize";

@Service()
export class UserRepo {
    public async getUser(email: string) {
        try {
            let result = await UserModel.findOne({ where: { email: email } });
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    public async createUser(user: { name: string; email: string; password: string }) {
        try {
            let result = await UserModel.create(user);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}
