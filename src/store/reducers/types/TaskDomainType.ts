import { REQUEST_STATUS } from 'enums';
import { TaskType } from 'types';

export type TaskDomainType = TaskType & {
    entityStatus: REQUEST_STATUS;
};
