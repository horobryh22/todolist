import {TASK_STATUS, TaskPriority} from 'enums';

export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: TaskPriority
    startDate: string
    status: TASK_STATUS
    title: string
    todoListId: string
}