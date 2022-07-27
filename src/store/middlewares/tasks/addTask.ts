import { todolistsAPI } from 'api';
import { REQUEST_STATUS } from 'enums';
import { addTask, setAppStatus } from 'store/reducers';
import { AppThunk } from 'store/types';
import { TaskType } from 'types';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const addTaskTC =
    (todolistId: string, title: string): AppThunk =>
    async dispatch => {
        try {
            dispatch(setAppStatus(REQUEST_STATUS.LOADING));
            const response = await todolistsAPI.createTask(todolistId, title);

            if (!response.data.resultCode) {
                const task = response.data.data.item;

                dispatch(addTask({ task }));
                dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
            } else {
                handleServerAppError<{ item: TaskType }>(response.data, dispatch);
            }
        } catch (e) {
            handleServerNetworkError(e as Error, dispatch);
        }
    };
