import { todolistsAPI } from 'api';
import { REQUEST_STATUS } from 'enums';
import { setAppStatus, setTasks } from 'store/reducers';
import { AppThunk } from 'store/types';
import { handleServerNetworkError } from 'utils';

export const getTasksTC =
    (todolistId: string): AppThunk =>
    async dispatch => {
        try {
            dispatch(setAppStatus(REQUEST_STATUS.LOADING));
            const response = await todolistsAPI.getTasks(todolistId);
            const tasks = response.data.items;

            dispatch(setTasks({ todolistId, tasks }));
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
        } catch (e) {
            handleServerNetworkError(e as Error, dispatch);
        }
    };
