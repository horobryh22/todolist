import {AppDispatch} from 'bll/redux/store';
import {REQUEST_STATUS, setAppStatus} from '../../reducers/app-reducer/app-reducer';
import {FormikInitialValuesType} from 'ui/components/Login/Login';
import {authAPI} from 'dal/api/todolist-api';
import {handleServerAppError, handleServerNetworkError} from 'bll/utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearAppData} from 'bll/redux/reducers/todolists-reducer/todolists-reducer';


const initialState = {
    isLoggedIn: false
}


export const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
    }
})

export const authReducer = slice.reducer;

export const loginTC = (data: FormikInitialValuesType) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const response = await authAPI.login(data);
        if (!response.data.resultCode) {
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
            dispatch(setIsLoggedIn(true));
        } else {
            handleServerAppError(response.data, dispatch);
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
}

export const logoutTC = () => async (dispatch: AppDispatch, store: any) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING))
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedIn(false))
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS))
            dispatch(clearAppData());
        } else {
            handleServerAppError(response.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
}

export const {setIsLoggedIn} = slice.actions;