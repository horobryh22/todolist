import { createAsyncThunk } from '@reduxjs/toolkit';

import { todolistsAPI } from 'api';
import { REQUEST_STATUS } from 'enums';
import { PayloadType, ThunkConfigType } from 'store/middlewares/types';
import { setAppStatus, setTaskEntityStatus } from 'store/reducers';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const updateTaskTitleTC = createAsyncThunk<
    PayloadType<{ taskId: string; title: string }>,
    PayloadType<{ taskId: string; title: string }>,
    ThunkConfigType
>(
    'tasks/updateTaskTitle',
    async (
        { todolistId, data: { taskId, title } },
        { dispatch, rejectWithValue, getState },
    ) => {
        try {
            dispatch(
                setTaskEntityStatus({
                    todolistId,
                    taskId,
                    entityStatus: REQUEST_STATUS.LOADING,
                }),
            );
            dispatch(setAppStatus(REQUEST_STATUS.LOADING));
            const tasks = getState().tasks[todolistId];
            const task = tasks.find(t => {
                return t.id === taskId;
            });

            if (task) {
                const response = await todolistsAPI.updateTask(todolistId, taskId, {
                    title,
                    startDate: task.startDate,
                    priority: task.priority,
                    description: task.description,
                    deadline: task.deadline,
                    status: task.status,
                });

                if (response.data.resultCode) {
                    handleServerAppError(response.data, dispatch);

                    return rejectWithValue(null);
                }

                return { todolistId, data: { taskId, title } };
            }

            return rejectWithValue(null);
        } catch (e) {
            handleServerNetworkError(e as Error, dispatch);

            return rejectWithValue(null);
        } finally {
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
            dispatch(
                setTaskEntityStatus({
                    todolistId,
                    taskId,
                    entityStatus: REQUEST_STATUS.IDLE,
                }),
            );
        }
    },
);
