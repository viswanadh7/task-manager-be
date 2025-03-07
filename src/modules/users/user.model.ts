import { AllowNull, Column, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table({ tableName: "USERS", timestamps: false })
export class UserModel extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column({ field: "userID", autoIncrement: true })
    declare userID: number;

    @AllowNull(false)
    @Column({ field: "name" })
    declare name: string;

    @AllowNull(false)
    @Unique
    @Column({ field: "email" })
    declare email: string;

    @AllowNull(false)
    @Column({ field: "password" })
    declare password: string;
}
