import { TaskDomainType } from './TaskDomainType';

export type TaskStateType = {
    [key: string]: Array<TaskDomainType>;
};
