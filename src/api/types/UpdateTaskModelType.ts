import {TASK_STATUS, TaskPriority} from 'enums';

export type UpdateTaskModelType = {
    title: string
    startDate: string
    priority: TaskPriority
    description: string
    deadline: string
    status: TASK_STATUS
}