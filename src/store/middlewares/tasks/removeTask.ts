import { createAsyncThunk } from '@reduxjs/toolkit';

import { todolistsAPI } from 'api';
import { REQUEST_STATUS } from 'enums';
import { PayloadType, ThunkConfigType } from 'store/middlewares/types';
import { setAppStatus, setTaskEntityStatus } from 'store/reducers';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const removeTaskTC = createAsyncThunk<
    PayloadType<{ taskId: string }>,
    PayloadType<{ taskId: string }>,
    ThunkConfigType
>(
    'tasks/removeTask',
    async ({ todolistId, data: { taskId } }, { dispatch, rejectWithValue }) => {
        try {
            dispatch(
                setTaskEntityStatus({
                    todolistId,
                    taskId,
                    entityStatus: REQUEST_STATUS.LOADING,
                }),
            );
            dispatch(setAppStatus(REQUEST_STATUS.LOADING));
            const response = await todolistsAPI.deleteTask(todolistId, taskId);

            if (response.data.resultCode) {
                handleServerAppError(response.data, dispatch);

                return rejectWithValue(null);
            }

            return { todolistId, data: { taskId } };
        } catch (e) {
            dispatch(
                setTaskEntityStatus({
                    todolistId,
                    taskId,
                    entityStatus: REQUEST_STATUS.IDLE,
                }),
            );
            handleServerNetworkError(e as Error, dispatch);

            return rejectWithValue(null);
        } finally {
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
        }
    },
);
