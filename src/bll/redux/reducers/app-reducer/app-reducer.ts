import {AppDispatch} from 'bll/redux/store';
import {authAPI} from 'dal/api/todolist-api';
import {handleServerAppError, handleServerNetworkError} from 'bll/utils/error-utils';
import {setIsLoggedIn} from 'bll/redux/reducers/auth-reducer/auth-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Nullable} from 'types';

export enum REQUEST_STATUS {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCESS = 'succeeded',
    FAILED = 'failed'
}

const initialState = {
    status: 'idle' as REQUEST_STATUS,
    error: null as Nullable<string>,
    isInitialized: false
}

export const appSlice = createSlice({
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

export const appReducer = appSlice.reducer;

export const {setAppStatus, setAppError, setIsInitialized} = appSlice.actions;

export const initializeAppTC = () => async (dispatch: AppDispatch) => {
    try {
        const response = await authAPI.me();
        if (!response.data.resultCode) {
            dispatch(setIsLoggedIn(true));
        } else {
            handleServerAppError(response.data, dispatch);
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    } finally {
        dispatch(setIsInitialized(true));
    }
}
