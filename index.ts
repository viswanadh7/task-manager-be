import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { useContainer, useExpressServer } from "routing-controllers";
import { UserController } from "./src/modules/users/user.controller";
import { TaskController } from "./src/modules/tasks/task.controller";
import { AuthMiddleware } from "./src/middleware/auth.middleware";
import Container from "typedi";
import { sequelize } from "./src/config/database";

dotenv.config();

const app = express();
app.use(express.json());
useContainer(Container);

const PORT = process.env.PORT || 5000;

useExpressServer(app, {
    cors: true,
    middlewares: [AuthMiddleware],
    controllers: [UserController, TaskController],
    routePrefix: "/api",
    defaultErrorHandler: false,
});

sequelize.sync().then(() => {
    console.log("---------- Database is connected ---------- ");
    app.listen(PORT, () => console.log("Server is running on port", PORT));
});
