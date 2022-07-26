import {AppThunk} from 'store/store';
import {setAppStatus} from 'store/reducers/app/app';
import {REQUEST_STATUS} from 'enums';
import {todolistsAPI} from 'api/todolists/todolistsAPI';
import {handleServerAppError, handleServerNetworkError} from 'utils/errorHandlers';
import {changeTodolistTitle} from 'store/reducers/todolists/todolists';

export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const response = await todolistsAPI.updateTodolist(todolistId, title);
        if (!response.data.resultCode) {
            dispatch(changeTodolistTitle({todolistId, title}));
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
        } else {
            handleServerAppError(response.data, dispatch);
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
}
