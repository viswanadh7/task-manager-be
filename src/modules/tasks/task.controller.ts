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
        @QueryParam("limit") limit?: number,
        @QueryParam("offset") offset?: number
    ) {
        console.log(sort, order, priority, status);
        const filter = {sort, order, priority, status, limit, offset}
        return this.taskService.getAllTasks(id, filter);
    }

    @Post("/create")
    async createTask(@Body() body: {}) {
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
