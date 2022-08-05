import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from 'enums';
import { initializeAppTC } from 'store/middlewares';
import { AppStateType } from 'store/reducers';
import { Nullable } from 'types';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        status: REQUEST_STATUS.IDLE,
        error: null,
        isInitialized: false,
    } as AppStateType,
    reducers: {
        setAppStatus: (state, action: PayloadAction<REQUEST_STATUS>) => {
            state.status = action.payload;
        },
        setAppError: (state, action: PayloadAction<Nullable<string>>) => {
            state.error = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(initializeAppTC.fulfilled, state => {
                state.isInitialized = true;
            })
            .addCase(initializeAppTC.rejected, state => {
                state.isInitialized = true;
            });
    },
});

export default appSlice.reducer;

export const { setAppStatus, setAppError } = appSlice.actions;
