import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from 'api';
import { REQUEST_STATUS } from 'enums';
import { ThunkConfigType } from 'store/middlewares/types';
import { setAppStatus } from 'store/reducers';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const logoutTC = createAsyncThunk<void, void, ThunkConfigType>(
    'auth/logout',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setAppStatus(REQUEST_STATUS.LOADING));
            const response = await authAPI.logout();

            if (response.data.resultCode) {
                handleServerAppError(response.data, dispatch);

                return rejectWithValue(null);
            }
        } catch (e) {
            handleServerNetworkError(e as Error, dispatch);

            return rejectWithValue(null);
        } finally {
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
        }
    },
);
