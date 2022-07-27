import {ThunkDispatch} from 'redux-thunk';
import {ResponseType} from 'api/types';
import {AnyAction} from 'redux';
import {REQUEST_STATUS} from 'enums';
import {RootState} from 'store';
import {setAppError, setAppStatus} from 'store/reducers';

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
    dispatch(setAppStatus(REQUEST_STATUS.FAILED))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    dispatch(setAppError(error.message))
    dispatch(setAppStatus(REQUEST_STATUS.FAILED))
}
