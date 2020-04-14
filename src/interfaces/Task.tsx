export enum TaskType {
    Bug = "bug",
    Feature = "feature"
}

export default interface Task {
    id: number;
    board_id: number,
    category_id: number,
    index: number;
    title: string;
    type: TaskType;
    description: string;
}
