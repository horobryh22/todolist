import {TaskType} from 'types';

export type ResponseGetTasksType = {
    error: string
    items: Array<TaskType>
    totalCount: number
}