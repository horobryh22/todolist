import {handleServerAppError, handleServerNetworkError} from 'utils';
import {removeTodolist, setAppStatus, setTodolistEntityStatus} from 'store/reducers';
import {AppThunk} from 'store/types';
import {REQUEST_STATUS} from 'enums';
import {todolistsAPI} from 'api';


export const removeTodolistTC = (todolistId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        dispatch(setTodolistEntityStatus({
            todolistId,
            entityStatus: REQUEST_STATUS.LOADING
        }));
        const response = await todolistsAPI.deleteTodolist(todolistId);
        if (!response.data.resultCode) {
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
            dispatch(removeTodolist({todolistId}));
        } else {
            handleServerAppError(response.data, dispatch);
        }
    } catch (e) {
        dispatch(setTodolistEntityStatus({
            todolistId,
            entityStatus: REQUEST_STATUS.IDLE
        }));
        handleServerNetworkError(e as Error, dispatch);
    }
}