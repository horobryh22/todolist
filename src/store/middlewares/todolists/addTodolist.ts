import {handleServerAppError, handleServerNetworkError} from 'utils';
import {AppThunk} from 'store/types';
import {REQUEST_STATUS} from 'enums';
import {todolistsAPI} from 'api';
import {addTodolist, setAppStatus} from 'store/reducers';


export const addTodolistTC = (title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const response = await todolistsAPI.createTodolist(title);
        if (!response.data.resultCode) {
            const todolist = response.data.data.item;
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
            dispatch(addTodolist({todolist}));
        } else {
            handleServerAppError(response.data, dispatch);
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
}