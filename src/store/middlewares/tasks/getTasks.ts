import {AppThunk} from 'store/store';
import {setAppStatus} from 'store/reducers/app/app';
import {REQUEST_STATUS} from 'enums';
import {todolistsAPI} from 'api/todolists/todolistsAPI';
import {handleServerNetworkError} from 'utils/errorHandlers';
import {setTasks} from 'store/reducers/tasks/tasks';

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