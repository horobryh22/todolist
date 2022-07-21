import {AppDispatch, AppRootState} from 'bll/redux/store';
import {REQUEST_STATUS, setAppStatusAC} from '../../reducers/app-reducer/app-reducer';
import {FormikInitialValuesType} from 'ui/components/Login/Login';
import {authAPI} from 'dal/api/todolist-api';
import {handleServerAppError, handleServerNetworkError} from 'bll/utils/error-utils';
import {
    clearAppData,
    removeToDoListAC,
    setTodolistsAC
} from 'bll/redux/reducers/action-creators/action-creators';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const initialState = {
    isLoggedIn: false
}


export const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
    }
})

export const authReducer = slice.reducer;

export const loginTC = (data: FormikInitialValuesType) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC(REQUEST_STATUS.LOADING));
        const response = await authAPI.login(data);
        if (!response.data.resultCode) {
            dispatch(setAppStatusAC(REQUEST_STATUS.SUCCESS));
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
        dispatch(setAppStatusAC(REQUEST_STATUS.LOADING))
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedIn(false))
            dispatch(setAppStatusAC(REQUEST_STATUS.SUCCESS))
            dispatch(clearAppData());
        } else {
            handleServerAppError(response.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
}

export type ActionsTypesAuth = ReturnType<typeof setIsLoggedIn>;

export const {setIsLoggedIn} = slice.actions;