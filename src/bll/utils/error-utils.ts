import {ResponseType} from '../../dal/api/todolist-api';
import {REQUEST_STATUS, setAppErrorAC, setAppStatusAC} from '../redux/reducers/app-reducer/app-reducer';
import {AppDispatch} from '../redux/store';

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: AppDispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC(REQUEST_STATUS.FAILED))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC(REQUEST_STATUS.FAILED))
}
