import { createAsyncThunk } from '@reduxjs/toolkit';

import { todolistsAPI } from 'api';
import { REQUEST_STATUS } from 'enums';
import { PayloadType, ThunkConfigType } from 'store/middlewares/types';
import { setAppStatus } from 'store/reducers';
import { TaskType } from 'types';
import { handleServerNetworkError } from 'utils';

export const getTasksTC = createAsyncThunk<
    PayloadType<{ tasks: TaskType[] }>,
    string,
    ThunkConfigType
>('tasks/getTasks', async (todolistId, { dispatch, rejectWithValue }) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const response = await todolistsAPI.getTasks(todolistId);
        const tasks = response.data.items;

        return { todolistId, data: { tasks } };
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);

        return rejectWithValue(null);
    } finally {
        dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
    }
});
