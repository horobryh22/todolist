import {TaskType} from 'api/todolists/todolistsAPI';
import {REQUEST_STATUS} from 'enums';

export type TaskDomainType = TaskType & {
    entityStatus: REQUEST_STATUS
}