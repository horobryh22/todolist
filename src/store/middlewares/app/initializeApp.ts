import {authAPI} from 'api/todolists/todolistsAPI';

import {handleServerAppError, handleServerNetworkError} from 'utils/errorHandlers';
import {AppDispatch} from 'store/types';
import {setIsInitialized, setIsLoggedIn} from 'store/reducers';

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