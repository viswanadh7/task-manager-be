import { Sequelize } from "sequelize-typescript";
import { UserModel } from "../modules/users/user.model";
import { TaskModel } from "../modules/tasks/task.model";
import dotenv from "dotenv";

dotenv.config();

// export const sequelize = new Sequelize({
//     database: process.env.DATABASE ?? "task",
//     host: process.env.HOST ?? "localhost",
//     port: Number(process.env.DB_PORT) ?? 3306,
//     dialect: "mysql",
//     username: process.env.USERNAME ?? "root",
//     password: process.env.DB_PASSWORD || "password",
//     models: [UserModel, TaskModel],
// });

export const sequelize = new Sequelize(
    process.env.DATABASE as string,
    process.env.USERNAME as string,
    process.env.DB_PASSWORD,
    {
        host: process.env.HOST,
        dialect: "mysql",
        port: Number(process.env.DB_PORT),
        models: [UserModel, TaskModel],
    }
);
