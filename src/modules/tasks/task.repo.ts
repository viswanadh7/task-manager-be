import { Service } from "typedi";
import { TaskModel } from "./task.model";
import { TFilter, TNewTask } from "./task.dao";
import { sequelize } from "../../config/database";

@Service()
export class TaskRepo {
    public async getOverallSummary(userID: number) {
        const query = `
        SELECT 
            COUNT(*) AS totalTasks,
            SUM(status = 'finished') AS finishedTasks,
            SUM(status <> 'finished') AS pendingTasks,
            COALESCE(
                SUM(CASE WHEN NOW() >= startTime AND status <> 'finished' THEN TIMESTAMPDIFF(SECOND, startTime, NOW()) END), 
            0) AS totalTimeLapsed,
            COALESCE(
                SUM(CASE WHEN status <> 'finished' THEN TIMESTAMPDIFF(SECOND, NOW(), endTime) END), 
            0) AS totalTimeToFinish,
            COALESCE(
                SUM(CASE WHEN status = 'finished' THEN TIMESTAMPDIFF(SECOND, startTime, endTime) END) 
                / NULLIF(SUM(status = 'finished'), 0), 
            0) AS avgTimePerCompletedTask,
            (SUM(status = 'finished') * 100.0) / NULLIF(COUNT(*), 0) AS finishedPercentage,
            (SUM(status <> 'finished') * 100.0) / NULLIF(COUNT(*), 0) AS pendingPercentage
        FROM TASKS
        WHERE userID = ${userID};
        `;
        try {
            const [results] = await sequelize.query(query, { type: "SELECT" });
            return results;
        } catch (error) {
            console.error("Error fetching task statistics:", error);
        }
    }
    public async getPendingSummary(userID: number) {
        const query = `
        SELECT 
            priority,
            COUNT(IF(status = 'pending', 1, NULL)) AS pendingTasks,
            SUM(CASE
                WHEN
                    NOW() >= startTime
                        AND status <> 'completed'
                THEN
                    TIMESTAMPDIFF(SECOND, startTime, NOW())
                ELSE 0
            END) AS totalTimeLapsed,
            SUM(CASE
                WHEN status <> 'completed' THEN TIMESTAMPDIFF(SECOND, NOW(), endTime)
                ELSE 0
            END) AS totalTimeToFinish
        FROM
            TASKS
        WHERE userID = ${userID}
        GROUP BY priority
        ORDER BY priority;
        `;
        let result = await sequelize.query(query, { type: "SELECT" });
        return result;
    }
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
        if (filter.page) {
            offsetCondition = Number(filter.page) * 10;
        }
        try {
            let result = await TaskModel.findAll({
                where: whereCondition,
                order: orderCondition,
                limit: filterCondition,
                offset: offsetCondition,
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    public async createTask(body: TNewTask) {
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
