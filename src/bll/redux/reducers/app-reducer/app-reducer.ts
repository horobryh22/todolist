import {AppDispatch} from 'bll/redux/store';
import {authAPI} from 'dal/api/todolist-api';
import {handleServerAppError, handleServerNetworkError} from 'bll/utils/error-utils';
import {setIsLoggedIn} from 'bll/redux/reducers/auth-reducer/auth-reducer';

export enum REQUEST_STATUS {
    IDLE  = 'idle',
    LOADING = 'loading',
    SUCCESS = 'succeeded',
    FAILED = 'failed'
}

const initialState = {
    status: 'idle' as REQUEST_STATUS,
    error: null as null | string,
    isInitialized: false
}

export type AppStateType = typeof initialState;

export const appReducer = (state: AppStateType = initialState, action: ActionTypesApp): AppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.appStatus}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.payload.isInitialized}
        default:
            return state
    }
}

export const setAppStatusAC = (appStatus: REQUEST_STATUS) => {
    return {
        type: 'APP/SET-STATUS',
        payload: {
            appStatus
        }
    } as const
}

export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        payload: {
            error
        }
    } as const
}

export const setIsInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'APP/SET-IS-INITIALIZED',
        payload: {
            isInitialized
        }
    } as const
}

export const initializeAppTC = () => async (dispatch: AppDispatch) => {
    try {
        const response = await authAPI.me();
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true));
        } else {
            handleServerAppError(response.data, dispatch);
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
    finally {
        dispatch(setIsInitializedAC(true));
    }
}

export type ActionTypesApp = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC> | ReturnType<typeof setIsInitializedAC>