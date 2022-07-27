import {handleServerAppError, handleServerNetworkError} from 'utils';
import {changeTaskTitle, setAppStatus, setTaskEntityStatus} from 'store/reducers';
import {AppThunk, RootState} from 'store/types';
import {REQUEST_STATUS} from 'enums';
import {todolistsAPI} from 'api';

export const updateTaskTitleTC = (taskId: string, todolistId: string, title: string): AppThunk => async (dispatch, getState: () => RootState) => {
    try {
        dispatch(setTaskEntityStatus({
            todolistId,
            taskId,
            entityStatus: REQUEST_STATUS.LOADING
        }));
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const tasks = getState().tasks[todolistId];
        const task = tasks.find(t => {
            return t.id === taskId;
        })

        if (task) {
            const response = await todolistsAPI.updateTask(todolistId, taskId, {
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            });
            if (!response.data.resultCode) {
                dispatch(changeTaskTitle({todolistId, taskId, newTitle: title}));
                dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
                dispatch(setTaskEntityStatus({
                    todolistId,
                    taskId,
                    entityStatus: REQUEST_STATUS.SUCCESS
                }));
            } else {
                handleServerAppError(response.data, dispatch);
            }
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
        dispatch(setTaskEntityStatus({
            todolistId,
            taskId,
            entityStatus: REQUEST_STATUS.IDLE
        }));
    }
}