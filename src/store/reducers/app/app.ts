import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Nullable} from 'types';
import {REQUEST_STATUS} from 'enums';
import {AppStateType} from 'store/reducers';

const initialState: AppStateType = {
    status: REQUEST_STATUS.IDLE,
    error: null ,
    isInitialized: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<REQUEST_STATUS>) => {
            state.status = action.payload;
        },
        setAppError: (state, action: PayloadAction<Nullable<string>>) => {
            state.error = action.payload;
        },
        setIsInitialized: (state, action: PayloadAction<boolean>) => {
            state.isInitialized = action.payload;
        }
    }
})

export default appSlice.reducer;

export const {setAppStatus, setAppError, setIsInitialized} = appSlice.actions;


