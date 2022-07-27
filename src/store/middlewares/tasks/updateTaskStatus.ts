import {handleServerAppError, handleServerNetworkError} from 'utils';
import {REQUEST_STATUS, TASK_STATUS} from 'enums';
import {changeTaskStatus, setAppStatus, setTaskEntityStatus} from 'store/reducers';
import {AppThunk, RootState} from 'store/types';
import {todolistsAPI} from 'api';

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TASK_STATUS): AppThunk => async (dispatch, getState: () => RootState) => {
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
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            });
            if (!response.data.resultCode) {
                dispatch(changeTaskStatus({todolistID: todolistId, taskId, status}));
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