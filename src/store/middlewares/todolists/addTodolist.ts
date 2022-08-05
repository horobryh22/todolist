import { createAsyncThunk } from '@reduxjs/toolkit';

import { todolistsAPI } from 'api';
import { REQUEST_STATUS } from 'enums';
import { ThunkConfigType } from 'store/middlewares/types';
import { setAppStatus } from 'store/reducers';
import { TodolistType } from 'types';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const addTodolistTC = createAsyncThunk<TodolistType, string, ThunkConfigType>(
    'todolists/addTodolist',
    async (title, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setAppStatus(REQUEST_STATUS.LOADING));
            const response = await todolistsAPI.createTodolist(title);

            if (!response.data.resultCode) {
                return response.data.data.item;
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
