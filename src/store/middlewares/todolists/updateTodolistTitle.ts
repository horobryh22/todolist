import { createAsyncThunk } from '@reduxjs/toolkit';

import { PayloadType, ThunkConfigType } from '../types';

import { todolistsAPI } from 'api';
import { REQUEST_STATUS } from 'enums';
import { setAppStatus } from 'store/reducers';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const updateTodolistTitleTC = createAsyncThunk<
    PayloadType<{ title: string }>,
    PayloadType<{ title: string }>,
    ThunkConfigType
>(
    'todolists/updateTodolistTitle',
    async ({ todolistId, data: { title } }, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setAppStatus(REQUEST_STATUS.LOADING));
            const response = await todolistsAPI.updateTodolist(todolistId, title);

            if (!response.data.resultCode) {
                return { todolistId, data: { title } };
            }
            handleServerAppError(response.data, dispatch);

            return rejectWithValue(null);
        } catch (e) {
            handleServerNetworkError(e as Error, dispatch);

            return rejectWithValue(null);
        } finally {
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
        }
    },
);
