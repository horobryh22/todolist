import {handleServerNetworkError} from 'utils';
import {AppThunk} from 'store/types';
import {REQUEST_STATUS} from 'enums';
import {todolistsAPI} from 'api';
import {setAppStatus, setTasks} from 'store/reducers';

export const getTasksTC = (todolistId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const response = await todolistsAPI.getTasks(todolistId);
        const tasks = response.data.items;
        dispatch(setTasks({todolistId, tasks}));
        dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
}