import { Service } from "typedi";
import { TaskModel } from "./task.model";
import { TFilter } from "./task.dao";

@Service()
export class TaskRepo {
    public async getAllTasks(userID: number, filter: TFilter) {
        let whereCondition: TFilter = { userID: userID };
        let orderCondition: [string, string][] = [];
        let filterCondition: number = 10;
        let offsetCondition: number = 0;
        if (filter.status) {
            whereCondition = { ...whereCondition, status: filter.status };
        }
        if (filter.priority) {
            whereCondition = { ...whereCondition, priority: filter.priority };
        }
        if (filter.sort && filter.order) {
            orderCondition[0] = [filter.sort, filter.order.toUpperCase()];
        }
        if (filter.limit && !isNaN(filter.limit)) {
            filterCondition = filter.limit;
        }
        if (filter.offset && !isNaN(filter.offset)) {
            offsetCondition = filter.offset;
        }
        try {
            let result = await TaskModel.findAll({
                where: whereCondition,
                order: orderCondition,
                limit: filterCondition,
                offset: offsetCondition,
            });
            console.log("result", result);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    public async createTask(body: {}) {
        try {
            let result = await TaskModel.create(body);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    public async updateTask(body: {}, taskID: number) {
        try {
            let result = await TaskModel.update(body, { where: { taskID } });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    public async deleteTask(taskID: number) {
        try {
            let result = await TaskModel.destroy({ where: { taskID: taskID } });
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}
