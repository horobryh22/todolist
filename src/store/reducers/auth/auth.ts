import { createSlice } from '@reduxjs/toolkit';

import { initializeAppTC, loginTC, logoutTC } from 'store/middlewares';
import { AuthStateType } from 'store/reducers';

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    } as AuthStateType,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, state => {
            state.isLoggedIn = true;
        });
        builder.addCase(loginTC.fulfilled, state => {
            state.isLoggedIn = true;
        });
        builder.addCase(logoutTC.fulfilled, state => {
            state.isLoggedIn = false;
        });
    },
});

export default slice.reducer;
