import { createAsyncThunk } from '@reduxjs/toolkit';

import { todolistsAPI } from 'api';
import { REQUEST_STATUS } from 'enums';
import { ThunkConfigType } from 'store/middlewares/types';
import { setAppStatus } from 'store/reducers';
import { TodolistType } from 'types';
import { handleServerNetworkError } from 'utils';

export const fetchTodolistsTC = createAsyncThunk<TodolistType[], void, ThunkConfigType>(
    'todolists/fetchTodolists',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setAppStatus(REQUEST_STATUS.LOADING));
            const response = await todolistsAPI.getTodolists();

            return response.data;
        } catch (e) {
            handleServerNetworkError(e as Error, dispatch);

            return rejectWithValue(null);
        } finally {
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
        }
    },
);
