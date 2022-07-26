import {AppThunk} from 'store/store';
import {setAppStatus} from 'store/reducers/app/app';
import {REQUEST_STATUS} from 'enums';
import {todolistsAPI} from 'api/todolists/todolistsAPI';
import {handleServerNetworkError} from 'utils/errorHandlers';
import {setTodolists} from 'store/reducers/todolists/todolists';

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