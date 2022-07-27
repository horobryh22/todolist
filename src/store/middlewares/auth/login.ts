import {handleServerAppError, handleServerNetworkError} from 'utils';
import {FormikInitialValuesType} from 'components/login';
import {authAPI} from 'api';
import {AppDispatch} from 'store/types';
import {REQUEST_STATUS} from 'enums';
import {setAppStatus, setIsLoggedIn} from 'store/reducers';

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