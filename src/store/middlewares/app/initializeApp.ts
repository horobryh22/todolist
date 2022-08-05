import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from 'api';
import { ThunkConfigType } from 'store/middlewares/types';
import { handleServerAppError, handleServerNetworkError } from 'utils';

export const initializeAppTC = createAsyncThunk<void, void, ThunkConfigType>(
    'app/initializeApp',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await authAPI.me();

            if (response.data.resultCode) {
                handleServerAppError(response.data, dispatch);

                return rejectWithValue(null);
            }
        } catch (e) {
            handleServerNetworkError(e as Error, dispatch);

            return rejectWithValue(null);
        }
    },
);
