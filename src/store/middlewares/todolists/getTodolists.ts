import {handleServerNetworkError} from 'utils';
import {AppThunk} from 'store/types';
import {REQUEST_STATUS} from 'enums';
import {todolistsAPI} from 'api';
import {setAppStatus, setTodolists} from 'store/reducers';

export const getTodolistsTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const response = await todolistsAPI.getTodolists();
        const todolists = response.data;
        dispatch(setTodolists({todolists}));
        dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
}