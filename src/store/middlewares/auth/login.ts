import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from 'api';
import { FormikInitialValuesType } from 'components/login';
import { REQUEST_STATUS } from 'enums';
import { ThunkConfigType } from 'store/middlewares/types';
import { setAppStatus } from 'store/reducers';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const loginTC = createAsyncThunk<void, FormikInitialValuesType, ThunkConfigType>(
    'auth/login',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setAppStatus(REQUEST_STATUS.LOADING));
            const response = await authAPI.login(data);

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
