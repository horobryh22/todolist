import {AppThunk} from 'store/store';
import {setAppStatus} from 'store/reducers/app/app';
import {REQUEST_STATUS} from 'enums';
import {todolistsAPI} from 'api/todolists/todolistsAPI';
import {handleServerAppError, handleServerNetworkError} from 'utils/errorHandlers';
import {removeTodolist, setTodolistEntityStatus} from 'store/reducers/todolists/todolists';

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