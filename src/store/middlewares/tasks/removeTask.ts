import {handleServerAppError, handleServerNetworkError} from 'utils';
import {removeTask, setAppStatus, setTaskEntityStatus} from 'store/reducers';
import {AppThunk} from 'store/types';
import {REQUEST_STATUS} from 'enums';
import {todolistsAPI} from 'api';

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setTaskEntityStatus({
            todolistId,
            taskId,
            entityStatus: REQUEST_STATUS.LOADING
        }));
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const response = await todolistsAPI.deleteTask(todolistId, taskId);
        if (!response.data.resultCode) {
            dispatch(removeTask({todolistID: todolistId, taskId}));
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
        } else {
            handleServerAppError(response.data, dispatch);
        }
    } catch (e) {
        dispatch(setTaskEntityStatus({
            todolistId,
            taskId,
            entityStatus: REQUEST_STATUS.IDLE
        }));
        handleServerNetworkError(e as Error, dispatch);
    }
}