import {AppDispatch} from 'store/store';
import {setAppStatus} from 'store/reducers/app/app';
import {REQUEST_STATUS} from 'enums';
import {authAPI} from 'api/todolists/todolistsAPI';
import {clearAppData} from 'store/reducers/todolists/todolists';
import {handleServerAppError, handleServerNetworkError} from 'utils/errorHandlers';
import {setIsLoggedIn} from 'store/reducers/auth/auth';

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