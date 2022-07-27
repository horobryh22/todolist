import {TASK_STATUS, TASK_PRIORITY} from 'enums';

export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: TASK_PRIORITY
    startDate: string
    status: TASK_STATUS
    title: string
    todoListId: string
}