import {AppDispatch} from 'bll/redux/store';
import {REQUEST_STATUS, setAppStatusAC} from '../../reducers/app-reducer/app-reducer';
import {FormikInitialValuesType} from 'ui/components/Login/Login';
import {authAPI} from 'dal/api/todolist-api';
import {handleServerAppError, handleServerNetworkError} from 'bll/utils/error-utils';


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsTypesAuth): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const loginTC = (data: FormikInitialValuesType) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC(REQUEST_STATUS.LOADING));
        const response = await authAPI.login(data);
        if (!response.data.resultCode) {
            dispatch(setAppStatusAC(REQUEST_STATUS.SUCCESS));
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(response.data, dispatch);
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
}

export const logoutTC = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC(REQUEST_STATUS.LOADING))
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC(REQUEST_STATUS.SUCCESS))
        } else {
            handleServerAppError(response.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
}

export type ActionsTypesAuth = ReturnType<typeof setIsLoggedInAC>;