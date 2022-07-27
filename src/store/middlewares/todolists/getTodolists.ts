import { todolistsAPI } from 'api';
import { REQUEST_STATUS } from 'enums';
import { setAppStatus, setTodolists } from 'store/reducers';
import { AppThunk } from 'store/types';
import { handleServerNetworkError } from 'utils';

export const getTodolistsTC = (): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const response = await todolistsAPI.getTodolists();
        const todolists = response.data;

        dispatch(setTodolists({ todolists }));
        dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
};
