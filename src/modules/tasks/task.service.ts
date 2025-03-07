import { Service } from "typedi";
import { TaskRepo } from "./task.repo";
import { HttpError } from "routing-controllers";
import { TFilter, TNewTask } from "./task.dao";

@Service()
export class TaskService {
    constructor(private taskRepo: TaskRepo) {}

    public async getAllTasks(userID: number, filter: TFilter) {
        try {
            let result = await this.taskRepo.getAllTasks(userID, filter);
            result = result?.map((res) => res.get({ plain: true }));
            return { status: 200, data: result };
        } catch (error) {
            throw new Error("Failed to get tasks");
        }
    }

    public async getDashborad(userID: number) {
        try {
            let summary = await this.taskRepo.getOverallSummary(userID);
            let pendingSummary = await this.taskRepo.getPendingSummary(userID);
            if (summary && pendingSummary) {
                return { status: 200, data: { summary, pendingSummary } };
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async createTask(body: TNewTask) {
        try {
            let result = await this.taskRepo.createTask(body);

            if (result) {
                return { status: 200, message: "Task added" };
            } else {
                return { message: "Failed to add task" };
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async updateTask(body: {}, taskID: number) {
        try {
            let result = await this.taskRepo.updateTask(body, taskID);
            if (result) {
                return { status: 200, message: "Task updated successfully" };
            }
            return { message: "Failed to update task" };
        } catch (error) {
            console.log(error);
        }
    }

    public async deleteTask(taskID: number) {
        try {
            let result = await this.taskRepo.deleteTask(taskID);
            if (result) {
                return { status: 200, message: "Task deleted" };
            }
            return { message: "Failed to delete task" };
        } catch (error) {
            console.log(error);
        }
    }
}
