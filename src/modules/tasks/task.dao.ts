export type TNewTask = {
    userID: number;
    title: string;
    priority?: number;
    status?: string;
    startTime?: Date;
    endTime?: Date;
};

export type TFilter = {
    userID?: number;
    sort?: string;
    order?: string;
    priority?: number;
    status?: string;
    page?: number;
};
