import { TASK_STATUS, TASK_PRIORITY } from 'enums';

export type UpdateTaskModelType = {
    title: string;
    startDate: string;
    priority: TASK_PRIORITY;
    description: string;
    deadline: string;
    status: TASK_STATUS;
};
