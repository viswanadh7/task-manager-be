import {
    AllowNull,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    Unique,
} from "sequelize-typescript";
import { UserModel } from "../users/user.model";

@Table({ tableName: "TASKS", timestamps: false })
export class TaskModel extends Model {
    // taskID, userID, title, priority, status, startTime, endTime
    @PrimaryKey
    @AllowNull(false)
    @Column({ field: "taskID", autoIncrement: true })
    declare taskID: number;

    @ForeignKey(() => UserModel)
    @AllowNull(false)
    @Column({ field: "userID" })
    declare userID: number;

    @AllowNull(false)
    @Column({ field: "title" })
    declare title: string;

    @Column({ field: "priority" })
    declare priority: string;

    @Column({ field: "status" })
    declare status: number;

    @Column({ field: "startTime" })
    declare startTime: Date;

    @Column({ field: "endTime" })
    declare endTime: Date;
}
