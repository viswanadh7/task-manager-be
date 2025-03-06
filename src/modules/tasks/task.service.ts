import { Service } from "typedi";
import { TaskRepo } from "./task.repo";
import { HttpError } from "routing-controllers";

@Service()
export class TaskService {
    constructor(private taskRepo: TaskRepo) {}

    public async getAllTasks(userID: number, filter: {}) {
        try {
            let result = await this.taskRepo.getAllTasks(userID, filter);
            result = result?.map((res) => res.get({ plain: true }));
            return { status: 200, data: result };
        } catch (error) {
            throw new Error("Failed to get tasks");
        }
    }

    public async createTask(body: {}) {
        try {
            let result = await this.taskRepo.createTask(body);

            if (result) {
                return { message: "Task created" };
            } else {
                throw new Error("Failed to get tasks");
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async updateTask(body: {}, taskID: number) {
        try {
            let result = await this.taskRepo.updateTask(body, taskID);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    public async deleteTask(taskID: number) {
        try {
            let result = await this.taskRepo.deleteTask(taskID);
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}
