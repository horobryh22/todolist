import {handleServerAppError, handleServerNetworkError} from 'utils';
import {authAPI} from 'api';
import {clearAppData, setAppStatus, setIsLoggedIn} from 'store/reducers';
import {AppDispatch} from 'store/types';
import {REQUEST_STATUS} from 'enums';


export const logoutTC = () => async (dispatch: AppDispatch) => {
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