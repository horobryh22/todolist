import {handleServerAppError, handleServerNetworkError} from 'utils';
import {AppThunk} from 'store/types';
import {REQUEST_STATUS} from 'enums';
import {todolistsAPI} from 'api';
import {changeTodolistTitle, setAppStatus} from 'store/reducers';

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
