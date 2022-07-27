import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { ResponseType } from 'api/types';
import { REQUEST_STATUS } from 'enums';
import { RootState } from 'store';
import { setAppError, setAppStatus } from 'store/reducers';

export const handleServerAppError = <T>(
    data: ResponseType<T>,
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
): void => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]));
    } else {
        dispatch(setAppError('Some error occurred'));
    }
    dispatch(setAppStatus(REQUEST_STATUS.FAILED));
};

export const handleServerNetworkError = (
    error: { message: string },
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
): void => {
    dispatch(setAppError(error.message));
    dispatch(setAppStatus(REQUEST_STATUS.FAILED));
};
