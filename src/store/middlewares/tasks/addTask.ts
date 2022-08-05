import { createAsyncThunk } from '@reduxjs/toolkit';

import { todolistsAPI } from 'api';
import { REQUEST_STATUS } from 'enums';
import { PayloadType, ThunkConfigType } from 'store/middlewares/types';
import { setAppStatus } from 'store/reducers';
import { TaskType } from 'types';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const addTaskTC = createAsyncThunk<
    TaskType,
    PayloadType<{ title: string }>,
    ThunkConfigType
>(
    'tasks/addTask',
    async ({ todolistId, data: { title } }, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setAppStatus(REQUEST_STATUS.LOADING));
            const response = await todolistsAPI.createTask(todolistId, title);

            if (response.data.resultCode) {
                handleServerAppError<{ item: TaskType }>(response.data, dispatch);

                return rejectWithValue(null);
            }

            return response.data.data.item;
        } catch (e) {
            handleServerNetworkError(e as Error, dispatch);

            return rejectWithValue(null);
        } finally {
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
        }
    },
);
