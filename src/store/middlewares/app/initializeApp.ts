import { authAPI } from 'api';
import { setIsInitialized, setIsLoggedIn } from 'store/reducers';
import { AppDispatch } from 'store/types';
import { handleServerAppError, handleServerNetworkError } from 'utils';

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
};
