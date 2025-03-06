import { Sequelize } from "sequelize-typescript";
import { UserModel } from "../modules/users/user.model";
import { TaskModel } from "../modules/tasks/task.model";
import dotenv from "dotenv";

dotenv.config();

// export const sequelize = new Sequelize({
//     database: process.env.DATABASE ?? "task",
//     host: process.env.HOST ?? "",
//     port: Number(process.env.DB_PORT) ?? 3306,
//     dialect: "mysql",
//     username: process.env.USERNAME ?? "root",
//     password: process.env.DB_PASSWORD || "password",
//     models: [UserModel, TaskModel],
// });

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
    dialect: "mysql",
    dialectOptions: {
        connectTimeout: 60000,
    },
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    define: { timestamps: false },
    logging: false,
    models: [UserModel, TaskModel],
});
