import {ResponseType} from '../../dal/api/todolist-api';
import {
    REQUEST_STATUS,
    setAppError,
    setAppStatus
} from '../redux/reducers/app-reducer/app-reducer';
import {AppDispatch, AppThunk, RootState} from '../redux/store';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

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
