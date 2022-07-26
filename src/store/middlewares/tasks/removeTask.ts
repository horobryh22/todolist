import {AppThunk} from 'store/store';
import {REQUEST_STATUS} from 'enums';
import {setAppStatus} from 'store/reducers/app/app';
import {todolistsAPI} from 'api/todolists/todolistsAPI';
import {handleServerAppError, handleServerNetworkError} from 'utils/errorHandlers';
import {removeTask, setTaskEntityStatus} from 'store/reducers/tasks/tasks';

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