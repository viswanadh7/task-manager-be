import {
    Body,
    Delete,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    QueryParam,
    QueryParams,
} from "routing-controllers";
import { Service } from "typedi";
import { TaskService } from "./task.service";
import { TNewTask } from "./task.dao";

@Service()
@JsonController("/tasks")
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get("/all/:id")
    getAllTasks(
        @Param("id") id: number,
        @QueryParam("sort") sort?: string,
        @QueryParam("order") order?: string,
        @QueryParam("priority") priority?: number,
        @QueryParam("status") status?: string,
        @QueryParam("page") page?: number
    ) {
        const filter = { sort, order, priority, status, page };
        return this.taskService.getAllTasks(id, filter);
    }

    @Get("/dashboard/:id")
    async getDashboard(@Param("id") userID: number) {
        return await this.taskService.getDashborad(userID);
    }

    @Post("/create")
    async createTask(@Body() body: TNewTask) {
        return this.taskService.createTask(body);
    }

    @Put("/update/:id")
    async updateTask(@Body() body: {}, @Param("id") taskID: number) {
        return this.taskService.updateTask(body, taskID);
    }

    @Delete("/delete/:id")
    async deleteTask(@Param("id") taskID: number) {
        return this.taskService.deleteTask(taskID);
    }
}
