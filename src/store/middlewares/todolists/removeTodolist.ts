import { createAsyncThunk } from '@reduxjs/toolkit';

import { todolistsAPI } from 'api';
import { REQUEST_STATUS } from 'enums';
import { ThunkConfigType } from 'store/middlewares/types';
import { setAppStatus, setTodolistEntityStatus } from 'store/reducers';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const removeTodolistTC = createAsyncThunk<string, string, ThunkConfigType>(
    'todolists/removeTodolist',
    async (todolistId, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setAppStatus(REQUEST_STATUS.LOADING));
            dispatch(
                setTodolistEntityStatus({
                    todolistId,
                    entityStatus: REQUEST_STATUS.LOADING,
                }),
            );
            const response = await todolistsAPI.deleteTodolist(todolistId);

            if (response.data.resultCode) {
                handleServerAppError(response.data, dispatch);

                return rejectWithValue(null);
            }

            return todolistId;
        } catch (e) {
            dispatch(
                setTodolistEntityStatus({
                    todolistId,
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
